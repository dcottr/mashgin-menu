"use client";

import { api } from "~/trpc/react";
import styles from "../index.module.css";
import Link from "next/link";
import Image from "next/image";

export function Categories() {
  const [menuData] = api.menu.getCategories.useSuspenseQuery();

  return menuData ? (
    <div className={styles.cardRow}>
      {menuData.categories.map((category) => (
        <Link
          key={category.id}
          className={styles.card}
          href={`/category/${category.id}`}
        >
          <h3 className={styles.cardTitle}>{category.name} →</h3>
          <Image
            src={category.imageURL}
            alt={category.name}
            width={300}
            height={300}
            objectFit="cover"
          />
        </Link>
      ))}
    </div>
  ) : (
    <p className={styles.showcaseText}>You have no menu yet.</p>
  );
}
