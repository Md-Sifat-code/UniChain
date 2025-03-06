import React from "react";
import { Outlet } from "react-router-dom";
import Navabr_Home from "../Pages/Home/Home_component/Navabr_Home";

const Dashboard_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <div className="container mx-auto p-6">
          <Navabr_Home />
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard_Layout;
