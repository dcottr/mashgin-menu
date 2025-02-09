"use client";

import { useParams, notFound } from "next/navigation";
import { Items } from "~/app/category/[categoryID]/items";
import styles from "~/app/index.module.css";
import Header from "~/app/category/[categoryID]/header";

export default function Page() {
  const { categoryID } = useParams();
  const categoryIDNumber = +(categoryID ?? "");
  if (!categoryIDNumber) return notFound();

  return (
    <>
      <Header categoryID={categoryIDNumber} />
      <main className={styles.main}>
        <div className={styles.container}>
          <Items categoryID={categoryIDNumber} />
        </div>
      </main>
    </>
  );
}
