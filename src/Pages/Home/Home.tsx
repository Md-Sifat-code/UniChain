import React from "react";
import Navabr_Home from "./Home_component/Navabr_Home";
import Hero from "./Home_component/Hero";
import Home_Navigation from "./Home_component/Home_Navigation";

const Home: React.FC = () => {
  return (
    <section className="bgland">
      <div className=" container bgland mx-auto min-h-screen">
        <div>
          <Navabr_Home />
        </div>
        <div>
          <Hero />
        </div>
        <div>
          <Home_Navigation />
        </div>
      </div>
    </section>
  );
};

export default Home;
