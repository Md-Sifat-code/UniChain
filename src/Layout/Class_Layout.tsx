import React from "react";
import { Outlet } from "react-router-dom";

const Class_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Class_Layout;
