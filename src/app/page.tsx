import { Categories } from "~/app/_components/categories";
import { HydrateClient } from "~/trpc/server";
import styles from "~/app/index.module.css";
import Navbar from "~/app/_components/navbar";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar title={"Menu"} />
      <main className={styles.main}>
        <div className={styles.container}>
          <Categories />
        </div>
      </main>
    </HydrateClient>
  );
}
