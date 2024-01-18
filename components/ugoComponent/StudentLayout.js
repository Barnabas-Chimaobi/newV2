import React from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

export default function StudentLayout() {
  const { collapseSidebar } = useProSidebar();
  return (
    <div>
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={"="}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}>
            {" "}
            <h2>Admin</h2>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
