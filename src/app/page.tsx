import styles from "~/app/index.module.css";
import Navbar from "~/app/_components/navbar";
import Categories from "./categories";

export default async function Page() {
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
