import React, { useContext, useState } from "react";
import { Button, Menu } from "antd";

import {
  HomeOutlined,
  CloudUploadOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Context from "../context";

export default function Sidebar() {
  const context = useContext(Context);

  const menu = [
    {
      page: "timespent",
      path: "/timespent",
      icon: <HomeOutlined />,
    },
    {
      page: "heatmap",
      path: "/heatmap",
      icon: <CloudUploadOutlined />,
    },
    {
      page: "activity",
      path: "/activity",
      icon: <FileImageOutlined />,
    },
  ];

  return (
    <>
      <Menu
        selectedKeys={[context ? context.page : ""]}
        mode="inline"
        theme="dark"
      >
        {menu.map((item) => (
          <Menu.Item key={item.page} icon={item.icon}>
            <Link style={{ textTransform: "capitalize" }} to={item.path}>
              {item.page}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}
