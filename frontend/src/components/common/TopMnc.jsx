import React from "react";

const TopMnc = ({ item }) => {
  // console.log(item);
  return (
    <div className="w-60 bg-zinc-50 h-auto flex items-center lg:mx-20">
      <div>
        <img
          className="w-10 h-10 object-contain rounded-full mr-5"
          src={item.logo}
          alt={item.name}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-bold">{item.name}</h3>
        <p className="text-xs font-semibold">{item.jobs}+ jobs</p>
      </div>
    </div>
  );
};

export default TopMnc;
