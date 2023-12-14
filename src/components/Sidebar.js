import React from "react";
import gridmenu from "../public/img/grid-menu.png";
import logout from "../public/img/logout.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <h1 className="logo heading">Logo</h1>
        <div className="sidebar-gridmenu-container">
          <img src={gridmenu} />
          <p className="sidebar-gridmenu-container-text">Songs</p>
        </div>
      </div>
      <div className="bottom">
        <div className="sidebar-gridmenu-container">
          <img src={logout} />
          <p className="sidebar-gridmenu-container-text">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
