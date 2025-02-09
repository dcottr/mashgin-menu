import { api } from "~/trpc/server";

import styles from "~/app/index.module.css";
import Link from "next/link";
import Image from "next/image";

export default async function Categories() {
  const { categories } = await api.menu.getCategories();

  return categories.length > 0 ? (
    <div className={styles.cardRow}>
      {categories.map((category) => (
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
    <div>{"No categories to choose from, check back later!"}</div>
  );
}
