import { Categories } from "~/app/_components/categories";
import { HydrateClient } from "~/trpc/server";
import styles from "~/app/index.module.css";

export default async function Home() {
  return (
    <HydrateClient>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Menu</h1>
          <Categories />
        </div>
      </main>
    </HydrateClient>
  );
}
