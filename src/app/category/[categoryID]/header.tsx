"use client";

import Navbar from "~/app/_components/navbar";
import { api } from "~/trpc/react";

export default function Header(props: { categoryID: number }) {
  const [categoryName] = api.menu.getCategoryName.useSuspenseQuery({
    categoryID: props.categoryID,
  });

  return <Navbar title={categoryName?.name ?? ""} />;
}
