"use client";

import { api } from "~/trpc/react";
import styles from "~/app/index.module.css";
import Image from "next/image";

export function Items(props: { categoryID: number }) {
  const [menuData] = api.menu.getCategoryItems.useSuspenseQuery({
    categoryID: props.categoryID,
  });

  return menuData ? (
    <div className={styles.cardRow}>
      {menuData.items.map((item) => (
        <div key={item.id} className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>{item.name}</h3>
          </div>
          <Image
            src={item.imageURL}
            alt={item.name}
            width={300}
            height={300}
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  ) : (
    <p className={styles.showcaseText}>You have no menu yet.</p>
  );
}
