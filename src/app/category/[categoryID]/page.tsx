import { Items } from "~/app/_components/items";
import { HydrateClient } from "~/trpc/server";
import styles from "~/app/index.module.css";
import { notFound } from "next/navigation";
import Header from "~/app/category/[categoryID]/header";

export default async function Page({
  params,
}: {
  params: Promise<{ categoryID: string }>;
}) {
  const categoryIDNumber = +(await params).categoryID;
  if (!categoryIDNumber) return notFound();

  return (
    <HydrateClient>
      <Header categoryID={categoryIDNumber} />
      <main className={styles.main}>
        <div className={styles.container}>
          <Items categoryID={categoryIDNumber} />
        </div>
      </main>
    </HydrateClient>
  );
}
