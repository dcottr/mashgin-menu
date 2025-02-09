"use client";

import { api } from "~/trpc/react";
import styles from "~/app/index.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  const [menuCategories] = api.menu.getCategories.useSuspenseQuery();

  return menuCategories ? (
    <div className={styles.cardRow}>
      {menuCategories.categories.map((category) => (
        <Link
          key={category.id}
          className={styles.card}
          href={`/category/${category.id}`}
        >
          <Image
            src={category.imageURL}
            alt={category.name}
            width={300}
            height={300}
            className={styles.cardImage}
            priority
          />
          <h3 className={styles.cardTitle}>{category.name} →</h3>
        </Link>
      ))}
    </div>
  ) : (
    <p className={styles.showcaseText}>You have no menu yet.</p>
  );
}
