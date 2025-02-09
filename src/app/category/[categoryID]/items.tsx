"use client";

import Image from "next/image";

import { api } from "~/trpc/react";
import styles from "~/app/index.module.css";
import { useCartStorage } from "~/app/hooks";
import QuantityPicker from "~/app/_components/quantityPicker";
import CircularProgress from "@mui/material/CircularProgress";

export function Items(props: { categoryID: number }) {
  const categoryItems = api.menu.getCategoryItems.useQuery({
    categoryID: props.categoryID,
  });

  // Cart is a record of item IDs to quantities
  const [cart, setCart] = useCartStorage();

  if (categoryItems.error) {
    <div className={styles.error}>
      <p>{categoryItems.error.message}</p>
    </div>;
  }

  return categoryItems.data?.items.length ? (
    <div className={styles.cardRow}>
      {categoryItems.data.items.map((item) => (
        <div key={item.id} className={styles.card}>
          <Image
            src={item.imageURL}
            alt={item.name}
            width={300}
            height={300}
            className={styles.cardImage}
            priority
          />
          <h3 className={styles.cardTitle}>{item.name}</h3>

          <div
            style={{
              height: "3rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.1rem",
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
        </div>
      ))}
    </div>
  ) : categoryItems.isLoading ? (
    <CircularProgress />
  ) : (
    <div>{"We're all out of stock, sorry!"}</div>
  );
}
