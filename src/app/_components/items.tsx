"use client";

import { api } from "~/trpc/react";
import styles from "~/app/index.module.css";
import Image from "next/image";
import { useLocalStorage } from "~/app/hooks";
import CloseIcon from "@mui/icons-material/Close";

function QuantityPicker(props: {
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  return props.quantity == 0 ? (
    <button
      className={styles.styledButton}
      onClick={() => props.setQuantity(1)}
    >
      + Add to Cart
    </button>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <button
        className={styles.borderlessButton}
        onClick={(e) => props.setQuantity(0)}
      >
        <CloseIcon style={{ color: "red" }} />
      </button>
      <input
        type="number"
        name="amount"
        min="0"
        value={props.quantity}
        onChange={(e) => props.setQuantity(+e.target.value)}
        style={{
          width: "3rem",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}

export function Items(props: { categoryID: number }) {
  const [menuItems] = api.menu.getCategoryItems.useSuspenseQuery({
    categoryID: props.categoryID,
  });

  // Cart is a record of item IDs to quantities, as
  const [cart, setCart] = useLocalStorage<Record<number, number>>("cart", {});

  return menuItems ? (
    <div className={styles.cardRow}>
      {menuItems.items.map((item) => (
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
  ) : (
    <p className={styles.showcaseText}>You have no menu yet.</p>
  );
}
