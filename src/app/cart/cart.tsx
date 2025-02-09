"use client";

import { api } from "~/trpc/react";
import Image from "next/image";
import { useLocalStorage } from "~/app/hooks";
import QuantityPicker from "~/app/_components/quantityPicker";
import Payment from "~/app/_components/payment";

export default function Cart() {
  // Cart is a record of item IDs to quantities. It will be null until it's loaded from local storage.
  const [cart, setCart] = useLocalStorage<Record<number, number> | null>(
    "cart",
    null
  );
  const itemIDsInCart = cart
    ? Object.keys(cart)
        .map((id) => +id)
        .filter((id) => cart[id] ?? 0 > 0)
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

  return cart && cartItems.data?.items?.length ? (
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
                }}
              >
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  width={50}
                  height={50}
                  priority
                />
                <h3>{item.name}</h3>
              </div>
              <div style={{ flexGrow: 1, width: "100px" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
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
      </div>
      <Payment
        onSubmit={(paymentData) => {
          // TODO: Submit the payment
        }}
      />
    </div>
  ) : (cartItems.isLoading && itemIDsInCart.length > 0) || cart === null ? (
    <></>
  ) : (
    <div>{"Items you add to your cart will show up here"}</div>
  );
}
