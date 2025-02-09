"use client";

import { api } from "~/trpc/react";
import styles from "~/app/index.module.css";
import Image from "next/image";
import { useLocalStorage } from "~/app/hooks";
import QuantityPicker from "~/app/_components/quantityPicker";

export function Items(props: { categoryID: number }) {
  const categoryItems = api.menu.getCategoryItems.useQuery({
    categoryID: props.categoryID,
  });

  // Cart is a record of item IDs to quantities, as
  const [cart, setCart] = useLocalStorage<Record<number, number>>("cart", {});

  return categoryItems.data ? (
    <div className={styles.cardRow}>
      {categoryItems.data.items.map((item) => (
        <div key={item.id} className={styles.card}>
          <h3 className={styles.cardTitle}>{item.name}</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 className={styles.cardTitle}>
              ${(item.priceInCents / 100).toFixed(2)}
            </h3>

            <QuantityPicker
              quantity={cart[item.id] ?? 0}
              setQuantity={(value) => setCart({ ...cart, [item.id]: value })}
            />
          </div>
          <Image
            src={item.imageURL}
            alt={item.name}
            width={300}
            height={300}
            className={styles.cardImage}
            priority
          />
        </div>
      ))}
    </div>
  ) : categoryItems.isLoading ? (
    <></> // TODO: spinner
  ) : (
    <div>{"We're all out of stock, sorry!"}</div>
  );
}
