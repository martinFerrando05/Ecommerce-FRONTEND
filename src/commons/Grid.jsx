import React from "react";
import Card from "./Card";

const Grid = ({ items, title }) => {
  return (
    <div className="mt-20 item w-full flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold text-slate-50">{title}</h1>
      <div className="flex flex-row flex-wrap justify-center gap-0 sm:gap-14 lg:gap-28 p-10 mt-10 ">
        {items.map((item, i) => {
          return <Card item={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Grid;
