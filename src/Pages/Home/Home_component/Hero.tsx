import React from "react";
import logo from "/Home.png";
import { Link } from "react-router-dom";
const Hero: React.FC = () => {
  return (
    <section>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-24">
        <div className=" flex flex-col justify-center p-6">
          <h1 className="text-2xl md:text-3xl lg:text-5xl lg:w-[80%] Poppin font-medium flex flex-col">
            Track Your University Routine Daily with
            <span className="uppercase font-bold iceland text-4xl text-blue-700">
              uni<span className="text-6xl text-amber-500">c</span>hain
            </span>
          </h1>
          <p className="font-normal lg:w-[70%] text-sm lg:text-xl roboto mt-4">
            Online Ai intrigated University HUB . Where Students can track their
            daily university routine , meal time, bus location.
          </p>
          <Link
            className="px-12 py-3 bg-red-300 w-[200px] flex flex-row justify-center font-bold text-white mt-6 rounded-[10px] items-center"
            to={""}
          >
            Get Started
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <img src={logo} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
