"use client";
import Navbar from "~/app/_components/navbar";
import dynamic from "next/dynamic";

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
