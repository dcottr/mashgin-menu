import { HydrateClient } from "~/trpc/server";
import styles from "~/app/index.module.css";
import Navbar from "~/app/_components/navbar";
import Cart from "~/app/cart/cart";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar title={"Cart"} hideCart />
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            minHeight: "60vh",
            flexWrap: "wrap",
            padding: "2rem",
          }}
        >
          <Cart />
        </div>
      </main>
    </HydrateClient>
  );
}
