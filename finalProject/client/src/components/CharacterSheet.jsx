import React from "react";

export default function CharacterSheet() {
    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden p-6">
            <div className="flex justify-between items-center">
                <img src="#" alt="Character Class Logo" className="w-24 h-24 border" />
                <p className="bg-white w-64 h-10">Character Name</p>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-6">
                        <p className="bg-white w-48 h-10 flex items-center">Class + level</p>
                        <p className="bg-white w-48 h-10 flex items-center">Background</p>
                        <p className="bg-white w-48 h-10 flex items-center">Username</p>
                    </div>
                    <div className="flex flex-row gap-6">
                        <p className="bg-white w-48 h-10 flex items-center">Race</p>
                        <select name="alignment" id="alignment" className="bg-white w-48 h-10">
                            <option value="lawfulGood">Lawful Good</option>
                        </select>
                        <input type="text" name="experience" id="experience" placeholder="EXP" className="bg-white w-48 h-10" />
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
}