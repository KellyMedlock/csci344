import React, {useState} from "react";
import {createCharacter, createCharacterStats} from "../api.js";

export default function CreateCharacterEl({ setPageType, back }) {
    const [error, setError] = useState("");
    const statOptions = [15, 14, 13, 12, 10, 8];
    const [stats, setStats] = useState({
        strength: null,
        dexterity: null,
        constitution: null,
        intelligence: null,
        wisdom: null,
        charisma: null,
    });
    const [bonuses, setBonuses] = useState({
        strength: [false, false],
        dexterity: [false, false],
        constitution: [false, false],
        intelligence: [false, false],
        wisdom: [false, false],
        charisma: [false, false],
    });
    
    async function submitCharacterData(e) {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        try {
            const newStats = {
                strength: getFinalStat("strength"),
                dexterity: getFinalStat("dexterity"),
                constitution: getFinalStat("constitution"),
                intelligence: getFinalStat("intelligence"),
                wisdom: getFinalStat("wisdom"),
                charisma: getFinalStat("charisma"),
            };

            const hasUnassignedStats = Object.values(stats).some((value) => value === null);

            if (hasUnassignedStats) {
                setError("Please assign a value to every stat.");
                return;
            }

            const createdStats = await createCharacterStats(newStats);

            const newCharacter = {
                character_name: formData.get("characterName"),
                class_dnd: formData.get("class_dnd"),
                race: formData.get("race"),
                background: formData.get("background"),
                level: Number(formData.get("level")),
                character_stats: createdStats.id,
            };

            await createCharacter(newCharacter);
            setPageType("ListView");
        } catch (err) {
            setError(err.message);
        }
    }

    function updateStat(statName, newValue) {
        const selectedValue = Number(newValue);

        setStats((prev) => {
            const oldValue = prev[statName];

            const statAlreadyUsingValue = Object.keys(prev).find(
                (key) => key !== statName && prev[key] === selectedValue
            );

            if (statAlreadyUsingValue) {
                return {
                    ...prev,
                    [statName]: selectedValue,
                    [statAlreadyUsingValue]: oldValue,
                };
            }

            return {
                ...prev,
                [statName]: selectedValue,
            };
        });
    }

    function toggleBonus(statName, index) {
        setBonuses((prev) => ({
            ...prev,
            [statName]: prev[statName].map((checked, i) =>
                i === index ? !checked : checked
            ),
        }));
    }

    function getFinalStat(statName) {
        if (stats[statName] === null) return "";

        const bonusAmount = bonuses[statName].filter(Boolean).length;
        return stats[statName] + bonusAmount;
    }

    function isOptionDisabled(statName, option) {
        return Object.entries(stats).some(
            ([otherStat, value]) => otherStat !== statName && value === option
        );
    }

    return (
        <div className="bg-[#AAACAD] min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden p-6">
            <button onClick={back} type="button" className="absolute left-10 top-36 text-5xl hover:text-shadow-lg">{"<"}</button>
            <form onSubmit={submitCharacterData} action="submit" className="flex flex-col gap-10 items-center text-xl">
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
                        <select name="class_dnd" id="class_dnd" className="bg-white rounded-md">
                            <option value="barbarian">Barbarian</option>
                            <option value="bard">Bard</option>
                            <option value="cleric">Cleric</option>
                            <option value="druid">Druid</option>
                            <option value="fighter">Fighter</option>
                            <option value="monk">Monk</option>
                            <option value="paladin">Paladin</option>
                            <option value="ranger">Ranger</option>
                            <option value="rogue">Rogue</option>
                            <option value="sorcerer">Sorcerer</option>
                            <option value="warlock">Warlock</option>
                            <option value="wizard">Wizard</option>
                            {/* <option value="artificer">Artificer</option> */}
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="races">Race: </label>
                        <select name="race" id="races" className="bg-white rounded-md">
                            <option value="human">Human</option>
                            <option value="dwarf">Dwarf</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="backgrounds">Background: </label>
                        <select name="background" id="backgrounds" className="bg-white rounded-md">
                            <option value="acolyte">Acolyte</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.keys(stats).map((statName) => (
                        <div key={statName} className="flex flex-col bg-white p-3 rounded-md">
                            <label className="capitalize font-bold">{statName}</label>

                            <select
                                value={stats[statName] ?? ""}
                                onChange={(e) => updateStat(statName, e.target.value)}
                                className="border rounded-md"
                                required
                            >
                                <option value="" disabled>
                                    Select stat
                                </option>

                                {statOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <div className="flex gap-3 mt-2">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={bonuses[statName][0]}
                                        onChange={() => toggleBonus(statName, 0)}
                                    />
                                    +1
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={bonuses[statName][1]}
                                        onChange={() => toggleBonus(statName, 1)}
                                    />
                                    +1
                                </label>
                            </div>

                            <p className="text-sm mt-1">
                                Final: {getFinalStat(statName)}
                            </p>
                        </div>
                    ))}
                </div>
                <button type="submit" className="cursor-pointer w-fit bg-white rounded-md px-4 py-1 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-none">Save</button>
            </form>
        </div>
    );
}