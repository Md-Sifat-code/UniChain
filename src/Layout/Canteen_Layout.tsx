import React from "react";
import { Outlet } from "react-router-dom";

const Canteen_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Canteen_Layout;
