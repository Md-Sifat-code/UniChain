import React from "react";
import { Outlet } from "react-router-dom";
import Navabr_Home from "../Pages/Home/Home_component/Navabr_Home";

const Event_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Navabr_Home />
        <Outlet />
      </div>
    </section>
  );
};

export default Event_Layout;
