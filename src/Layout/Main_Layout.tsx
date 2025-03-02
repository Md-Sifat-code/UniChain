import React from "react";
import { Outlet } from "react-router-dom";

const Main_Layout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Main_Layout;
