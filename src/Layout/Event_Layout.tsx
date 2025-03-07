import React from "react";
import { Outlet } from "react-router-dom";

const Event_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Event_Layout;
