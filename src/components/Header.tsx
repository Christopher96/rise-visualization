import React, { useContext } from "react";
import { PageHeader } from "antd";
import Context from "../context";

export default function Header() {
  const context = useContext(Context);

  return (
    <PageHeader
      style={{ textTransform: "capitalize" }}
      className="site-page-header"
      ghost={false}
      title={context?.page}
    />
  );
}
