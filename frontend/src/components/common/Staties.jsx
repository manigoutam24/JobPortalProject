import { User } from "lucide-react";
import React from "react";

const Staties = ({ item }) => {
  return (
    <div className="flex items-center gap-2 my-2">
      <span className="text-sky-500">{item.icon}</span>
      <div className="flex flex-col text-xs font-semibold">
        <span className="font-bold">{item.people}</span>
        <span>{item.title}</span>
      </div>
    </div>
  );
};

export default Staties;
