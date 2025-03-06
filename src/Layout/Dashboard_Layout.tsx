import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard_Layout;
