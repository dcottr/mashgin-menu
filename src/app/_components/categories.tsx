"use client";

import { api } from "~/trpc/react";
import styles from "../index.module.css";

export function Categories() {
  const [menuData] = api.menu.getMenu.useSuspenseQuery();

  return (
    <div className={styles.showcaseContainer}>
      {menuData ? (
        <p className={styles.showcaseText}>Menu data: {menuData.title}</p>
      ) : (
        <p className={styles.showcaseText}>You have no menu yet.</p>
      )}
    </div>
  );
}
