"use client";

import styles from "~/app/index.module.css";
import Navbar from "~/app/_components/navbar";
import dynamic from "next/dynamic";

const Categories = dynamic(() => import("~/app/categories"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Navbar title={"Menu"} hideHome />
      <main className={styles.main}>
        <div className={styles.container}>
          <Categories />
        </div>
      </main>
    </>
  );
}
