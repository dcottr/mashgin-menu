"use client";

import { api } from "~/trpc/react";
import styles from "~/app/index.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  const categories = api.menu.getCategories.useQuery();

  if (categories.error) {
    <div className={styles.error}>
      <p>{categories.error.message}</p>
    </div>;
  }

  return categories.data ? (
    <div className={styles.cardRow}>
      {categories.data.categories.map((category) => (
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
  ) : categories.isLoading ? (
    <></> // TODO: spinner
  ) : (
    <div>{"No categories to choose from, check back later!"}</div>
  );
}
