import { useEffect, useState } from "react";

const isServer = typeof window === "undefined";

function validateCartType(cart: Record<number, number>) {
  (Object.entries(cart) as unknown[] as [number, number][]).forEach(
    ([key, value]) => {
      if (typeof key !== "number" || typeof value !== "number") {
        return false;
      }
    }
  );
  return true;
}
/*
  Wrapper around useLocalStorage that validates the cart type & removes any items with a quantity of 0
  The cart is a record of item IDs to quantities
  Usage:
      const [cart, setCart, cartIsLoaded] = useCartStorage();
      setCart({1: 2});
*/
export function useCartStorage(): [
  Record<number, number>,
  (newCart: Record<number, number>) => void,
  boolean
] {
  const [cart, setCart, cartIsLoaded] = useLocalStorage<Record<number, number>>(
    "cart",
    {}
  );
  if (!validateCartType(cart)) {
    console.error("Local storage cart is corrupted");
    setCart({}); // The cart is corrupted, reset it
  }

  const setCartWrapper = (newCart: Record<number, number>) => {
    if (!validateCartType(newCart)) {
      console.error("Attempted to set a corrupted cart");
      return;
    }
    const filteredCart = Object.fromEntries(
      Object.entries(newCart).filter(([key, value]) => value && value > 0)
    );
    setCart(filteredCart);
  };

  return [cart, setCartWrapper, cartIsLoaded];
}

/*
  Returns the value, a setter, and a boolean indicating if the value has been loaded from local storage
  Example usage:
    const [localData, setLocalData, localDataIsLoaded] = useLocalStorage<Record<number, number>>("key", {});
    setlocalData(data);
*/
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (cb: React.SetStateAction<T>) => void, boolean] {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => initialValue);
  const [loaded, setLoaded] = useState<boolean>(false);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      setLoaded(true);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  };

  // Prevent hydration error by only initializing state after server is defined
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
  }, []);

  const setValue = (value: T | ((old: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to local storage if we're in the browser
      if (!isServer) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue, loaded];
}
