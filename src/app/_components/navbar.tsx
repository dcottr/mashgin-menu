import React from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "~/app/index.module.css";

const Navbar = (props: { title: string }) => {
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          overflow: "hidden",
          backgroundColor: "darkslateblue",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 0.75rem",
        }}
      >
        <Link href="/">
          <HomeIcon style={{ color: "white", fontSize: "2rem" }} />
        </Link>
        <p className={styles.title}>{props.title}</p>
        <Link href="/cart">
          <ShoppingCartIcon style={{ color: "white", fontSize: "2rem" }} />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
