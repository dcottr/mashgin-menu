"use client";
import dynamic from "next/dynamic";

import Navbar from "~/app/_components/navbar";

// This turns off server-side rendering for the Cart, because it relies on local storage.
const Cart = dynamic(() => import("~/app/cart/cart"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
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
    </>
  );
}
