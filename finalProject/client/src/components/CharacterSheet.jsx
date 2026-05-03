import React from "react";

export default function CharacterSheet({ setPageType, back }) {
    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden p-6">
            <button onClick={back} type="button" className="absolute left-10 top-36 text-5xl hover:text-shadow-lg">{"<"}</button>
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

            <div className="grid grid-cols-12 grid-rows-12 gap-2.5 mt-5">
                <div className="col-start-1 col-end-2 row-start-1 row-end-13 flex flex-col justify-between">
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">+3</p>
                        <p className=" absolute bottom-0">STR 16</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">+3</p>
                        <p className=" absolute bottom-0">DEX 16</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">+3</p>
                        <p className=" absolute bottom-0">CON 16</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">+3</p>
                        <p className=" absolute bottom-0">INT 16</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">+3</p>
                        <p className=" absolute bottom-0">WIS 16</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">+3</p>
                        <p className=" absolute bottom-0">CHA 16</p>
                    </div>
                </div>

                <div className="col-start-2 col-end-4 row-start-1 row-end-5 border p-2.5 flex flex-col justify-between rounded-lg">
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2">Strength</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2">Dexterity</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2">Consitution</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2">Intellegence</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2">Wisdom</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2">Charisma</p>
                    </div>
                    <p className="self-center font-bold">Saving Throws</p>
                </div>

                <div className="col-start-4 col-end-5 row-start-1 row-end-5 flex flex-col justify-between">
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">+2</p>
                        <p className="absolute bottom-0.5 text-sm">Proficency</p>
                    </div>
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">+3</p>
                        <p className="absolute bottom-0.5 text-sm">Initiative</p>
                    </div>
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">14</p>
                        <p className="absolute bottom-0.5 text-sm">AC</p>
                    </div>
                </div>

                <div className="col-start-2 col-end-5 row-start-5 row-end-13 border flex flex-col justify-between p-2.5 rounded-lg">
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Acrobatics (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Animal Handling (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Arcana (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Athletics (Str)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Deception (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">History (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Insight (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Intimidation (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Investigation (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Medicine (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Nature (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Perception (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Performance (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Persuasion (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Religion (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Sleight of Hand (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Stealth (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" name="savingThrow" id="savingThrow" />
                        <p>+3</p>
                        <p className="pl-2 text-sm">Survival (Wis)</p>
                    </div>
                </div>

                <div className="col-start-5 col-end-8 row-start-1 row-end-5 border rounded-lg flex flex-col items-center justify-around p-2.5">
                    <div className="bg-white h-10 w-full">
                        <p></p>
                        <p>Current Hit Points</p>
                    </div>
                    <div className="bg-white h-10 w-full">
                        <p></p>
                        <p>Temporary Hit Points</p>
                    </div>
                    <div className="flex justify-around w-full h-15">
                        <div className="bg-white flex flex-col w-1/3 h-15 relative items-center">
                            <p></p>
                            <p className="absolute bottom-0">Hit Dice</p>
                        </div>
                        <div className="flex flex-col bg-white p-1">
                            <div className="flex justify-end gap-1">
                                <label className="text-xs">Successes</label>
                                <div className="flex gap-0.5">
                                    <input type="checkbox" name="" id="" />
                                    <input type="checkbox" name="" id="" />
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-1">
                                <label className="text-xs">Failures</label>
                                <div className="flex gap-0.5">
                                    <input type="checkbox" name="" id="" />
                                    <input type="checkbox" name="" id="" />
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                            <p className="self-center">Death Saves</p>
                        </div>
                    </div>
                </div>

                <div className="col-start-5 col-end-8 row-start-5 row-end-9 border rounded-lg">

                </div>
                
                <div className="col-start-5 col-end-8 row-start-9 row-end-13 border rounded-lg">

                </div>
                
                <div className="col-start-8 col-end-13 row-start-1 row-end-5 border rounded-lg">

                </div>
                
                <div className="col-start-8 col-end-13 row-start-5 row-end-13 border rounded-lg">

                </div>
            </div>
        </div>
    );
}