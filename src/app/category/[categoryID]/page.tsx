import { Items } from "~/app/_components/items";
import { HydrateClient } from "~/trpc/server";
import styles from "~/app/index.module.css";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryID: string }>;
}) {
  const categoryIDNumber = +(await params).categoryID;
  console.log("categoryID", categoryIDNumber);
  if (!categoryIDNumber) return notFound();

  return (
    <HydrateClient>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Menu</h1>
          <Items categoryID={categoryIDNumber} />
        </div>
      </main>
    </HydrateClient>
  );
}
