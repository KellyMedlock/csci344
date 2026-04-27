import React from "react";

export default function CharacterSheet() {
    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden p-6">
            <div className="flex justify-between">
                <img src="#" alt="Character Class Logo" />
                <p>Character Name</p>
                <div>
                    <div className="flex flex-row">
                        <p>Class + level</p>
                        <p>Background</p>
                        <p>Username</p>
                    </div>
                    <div className="flex flex-row">
                        <p>Race</p>
                        <select name="alignment" id="alignment">
                            <option value="lawfulGood">Lawful Good</option>
                        </select>
                        <input type="text" name="experience" id="experience" />
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
}