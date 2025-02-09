"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "~/app/index.module.css";
import { api } from "~/trpc/react";
import { useLocalStorage } from "~/app/hooks";
import Payment from "~/app/cart/payment";
import QuantityPicker from "~/app/_components/quantityPicker";

export default function Cart() {
  // Cart is a record of item IDs to quantities. It will be null until it's loaded from local storage.
  const [cart, setCart, cartIsLoaded] = useLocalStorage<Record<number, number>>(
    "cart",
    {}
  );
  const itemIDsInCart = cart
    ? Object.keys(cart)
        .map((id) => Number(id))
        .filter((id) => (!isNaN(id) && cart[id]) ?? 0 > 0)
    : [];

  const cartItems = api.menu.getCartItems.useQuery(
    {
      itemIDs: itemIDsInCart,
    },
    {
      enabled: itemIDsInCart.length > 0,
      suspense: true,
    }
  );
  const [errorMessage, setErrorMessage] = useState<string>();
  const checkout = api.menu.checkout.useMutation({
    onError: (error) => {
      setErrorMessage("Failed to check out, please try again later");
    },
  });

  useEffect(() => {
    setErrorMessage(undefined);
  }, [cart]);

  useEffect(() => {
    if (checkout.isSuccess) {
      setCart({}); // Wipe the cart after a successful checkout
      setErrorMessage(undefined);
    }
  }, [checkout.isSuccess]);

  if (checkout.isSuccess) {
    return (
      <div>{"Thank you for your purchase, we've processed your order!"}</div>
    );
  }

  return (
    <>
      {errorMessage && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
        </div>
      )}

      {cartItems.data?.items?.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "4rem",
          }}
        >
          <div>
            {cartItems.data.items.map((item) => (
              <div key={item.id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.5rem",
                      flex: 1,
                      maxWidth: "600px",
                    }}
                  >
                    <Image
                      src={item.imageURL}
                      alt={item.name}
                      width={50}
                      height={50}
                      priority
                    />
                    <h3 style={{ textWrap: "wrap" }}>{item.name}</h3>
                    <div
                      style={{
                        flexGrow: 1,
                      }}
                    />
                    <h3>${(item.priceInCents / 100).toFixed(2)}</h3>

                    <QuantityPicker
                      quantity={cart[item.id] ?? 0}
                      setQuantity={(value) =>
                        // Set to undefined to wipe-out the key entry
                        setCart({ ...cart, [item.id]: value ?? undefined })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* These 2 divs are for creating a separation line from the total */}
            <div style={{ height: "1rem" }} />
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "lightgray",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <h3>Total:</h3>
              <h3>
                $
                {(
                  cartItems.data.items.reduce(
                    (sum, nextItem) =>
                      sum + nextItem.priceInCents * (cart[nextItem.id] ?? 0), // Shouldn't be undefined in practice
                    0
                  ) / 100
                ).toFixed(2)}
              </h3>
            </div>
          </div>
          <Payment
            setError={setErrorMessage}
            onSubmit={(paymentData) => {
              checkout.mutate({
                order: itemIDsInCart.map((itemID) => {
                  return {
                    itemID,
                    quantity: cart[itemID] ?? 0,
                  };
                }),
                payment: {
                  name: paymentData.name,
                  cardNumber: paymentData.cardNumber,
                  cvv: Number(paymentData.cvv),
                  expiry: paymentData.expiry,
                },
              });
            }}
          />
        </div>
      ) : cartItems.isLoading || !cartIsLoaded ? (
        <></>
      ) : (
        <div>{"Items you add to your cart will show up here"}</div>
      )}
    </>
  );
}
