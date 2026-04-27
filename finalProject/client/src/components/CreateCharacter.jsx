import React from "react";

export default function CreateCharacter() {
    return (
        <div className="bg-[#AAACAD] min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden p-6 hidden">
            <form action="submit" className="flex flex-col gap-10 items-center text-xl">
                <div className="w-full flex justify-between">
                    <div>
                        <label htmlFor="characterName">Character Name: </label>
                        <input type="text" name="characterName" id="characterName" className="bg-white rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="levels">Level: </label>
                        <select name="level" id="levels" className="bg-white rounded-md">
                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                            <option value="4">Level 4</option>
                            <option value="5">Level 5</option>
                            <option value="6">Level 6</option>
                            <option value="7">Level 7</option>
                            <option value="8">Level 8</option>
                            <option value="9">Level 9</option>
                            <option value="10">Level 10</option>
                            <option value="11">Level 11</option>
                            <option value="12">Level 12</option>
                            <option value="13">Level 13</option>
                            <option value="14">Level 14</option>
                            <option value="15">Level 15</option>
                            <option value="16">Level 16</option>
                            <option value="17">Level 17</option>
                            <option value="18">Level 18</option>
                            <option value="19">Level 19</option>
                            <option value="20">Level 20</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex justify-between gap-8">
                    <div>
                        <label htmlFor="classes">Class: </label>
                        <select name="class" id="classes" className="bg-white rounded-md">
                            <option value="barbarian">Barbarian</option>
                            <option value="druic">Druid</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="races">Race: </label>
                        <select name="race" id="races" className="bg-white rounded-md">
                            <option value="human">Human</option>
                            <option value="Dwarf">Dwarf</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="backgrounds">Background: </label>
                        <select name="background" id="backgrounds" className="bg-white rounded-md">
                            <option value="acolyte">Acolyte</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="cursor-pointer w-fit bg-white rounded-md px-4 py-1 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none">Save</button>
            </form>
        </div>
    );
}