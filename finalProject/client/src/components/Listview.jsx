import React from "react";
import Listitem from "./Listitem";
import Addlistitem from "./Addlistitem";

export default function Listview({ setPageType }) {
    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden pb-6">
            <Listitem setPageType={setPageType} />
            <Addlistitem setPageType={setPageType} />
        </div>
    );
}