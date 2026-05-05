import React, { useState, useEffect } from "react";
import { deleteCharacter, getCharacterById, updateCharacter } from "../api.js";

export default function CharacterSheet({ setPageType, back, characterId }) {
    const [character, setCharacter] = useState(null);
    const [classInfo, setClassInfo] = useState(null);
    const [levelInfo, setLevelInfo] = useState(null);
    const [featuresInfo, setFeaturesInfo] = useState(null);
    const [proficencies, setProficencies] = useState({});

    useEffect(() => {
        async function loadCharacter() {
            const data = await getCharacterById(characterId);
            setCharacter(data);

            const className = data.class_dnd.toLowerCase();
            const level = data.level;

            if(data.proficencies) {
                setProficencies(JSON.parse(data.proficencies));
            }

            const response = await fetch(
                `https://www.dnd5eapi.co/api/2014/classes/${className}`
            );

            const classData = await response.json();
            setClassInfo(classData);
            
            const response2 = await fetch(
                `https://www.dnd5eapi.co/api/2014/classes/${className}/levels/${level}`
            );

            const levelData = await response2.json();
            setLevelInfo(levelData);
            console.log(levelData)

            const featuresData = await Promise.all(
                levelData.features.map(async (feature) => {
                    const response3 = await fetch(
                        `https://www.dnd5eapi.co${feature.url}`
                    );

                    return await response3.json();
                })
            )

            setFeaturesInfo(featuresData);
        }

        if(characterId) {
            loadCharacter();
        }
    }, [characterId]);

    async function submitDelete() {
        await deleteCharacter(characterId);
        setPageType("ListView");
    }

    function getModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    function formatModifier(modifier) {
        return modifier >= 0 ? `+${modifier}` : modifier;
    }

    async function toggleProficencies(name) {
        const updated = {
            ...proficencies,
            [name]: !proficencies[name],
        };
        
        setProficencies(updated);

        await updateCharacter(characterId, {
            proficencies: JSON.stringify(updated),
        });
    }

    function getProficencientModifier(baseModifier, name) {
        const profBonus = levelInfo?.prof_bonus || 0;
        const total = proficencies[name] ? baseModifier + profBonus : baseModifier;

        return formatModifier(total);
    }

    if(!character) {
        return <p>Loading Character...</p>
    }

    const modifiers = {
        strengthMod: formatModifier(getModifier(character.character_stats.strength)),
        dexterityMod: formatModifier(getModifier(character.character_stats.dexterity)),
        constitutionMod: formatModifier(getModifier(character.character_stats.constitution)),
        intelligenceMod: formatModifier(getModifier(character.character_stats.intelligence)),
        wisdomMod: formatModifier(getModifier(character.character_stats.wisdom)),
        charismaMod: formatModifier(getModifier(character.character_stats.charisma)),
    }

    const baseModifiers = {
        baseStr: getModifier(character.character_stats.strength),
        baseDex: getModifier(character.character_stats.dexterity),
        baseCon: getModifier(character.character_stats.constitution),
        baseInt: getModifier(character.character_stats.intelligence),
        baseWis: getModifier(character.character_stats.wisdom),
        baseCha: getModifier(character.character_stats.charisma)
    }
    
    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 flex flex-col overflow-hidden p-6">
            <button onClick={back} type="button" className="absolute left-10 top-36 text-5xl hover:text-shadow-lg">{"<"}</button>
            <button onClick={submitDelete} type="button" className="absolute right-30 top-40 fill-[#4BA9C9] stroke-transparent hover:drop-shadow-lg hover:scale-105 hover:fill-[#59D5FF]">
                <svg width={35} height={35} id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    <path className="[stroke-miterlimit:10]" d="M28.13,39.32H11.87c-.89,0-1.63-.68-1.71-1.56l-2.5-28.2h24.66l-2.5,28.2c-.08.88-.82,1.56-1.71,1.56Z"/>
                    <path className="[stroke-miterlimit:10]" d="M10.46,4.8h19.08c2.62,0,4.75,2.13,4.75,4.75H5.71c0-2.62,2.13-4.75,4.75-4.75Z"/>
                    <path className="[stroke-miterlimit:10]" d="M18.8.68h2.39c2.27,0,4.12,1.85,4.12,4.12h-10.63c0-2.27,1.85-4.12,4.12-4.12Z"/>
                </svg>
            </button>
            <div className="flex justify-between items-center">
                <img src="#" alt="Character Class Logo" className="w-24 h-24 border" />
                <p className="bg-white w-64 h-10 flex items-center pl-1 capitalize">{character.character_name}</p>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-6">
                        <p className="bg-white w-48 h-10 flex items-center pl-1 capitalize">{character.class_dnd} {character.level}</p>
                        <p className="bg-white w-48 h-10 flex items-center pl-1 capitalize">{character.background}</p>
                        <p className="bg-white w-48 h-10 flex items-center pl-1">{character.owner.username}</p>
                    </div>
                    <div className="flex flex-row gap-6">
                        <p className="bg-white w-48 h-10 flex items-center pl-1 capitalize">{character.race}</p>
                        <select name="alignment" id="alignment" className="bg-white w-48 h-10">
                            <option value="lawfulGood">Lawful Good</option>
                        </select>
                        <input type="text" name="experience" id="experience" placeholder="EXP" className="bg-white w-48 h-10" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 grid-rows-12 gap-2.5 mt-5 min-h-0 max-h-176">
                <div className="col-start-1 col-end-2 row-start-1 row-end-13 flex flex-col justify-between">
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">{modifiers.strengthMod}</p>
                        <p className=" absolute bottom-0">STR {character.character_stats.strength}</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">{modifiers.dexterityMod}</p>
                        <p className=" absolute bottom-0">DEX {character.character_stats.dexterity}</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">{modifiers.constitutionMod}</p>
                        <p className=" absolute bottom-0">CON {character.character_stats.constitution}</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">{modifiers.intelligenceMod}</p>
                        <p className=" absolute bottom-0">INT {character.character_stats.intelligence}</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">{modifiers.wisdomMod}</p>
                        <p className=" absolute bottom-0">WIS {character.character_stats.wisdom}</p>
                    </div>
                    <div className="bg-white w-19 h-19 flex flex-col items-center pt-2 relative">
                        <p className="text-5xl">{modifiers.charismaMod}</p>
                        <p className=" absolute bottom-0">CHA {character.character_stats.charisma}</p>
                    </div>
                </div>

                <div className="col-start-2 col-end-4 row-start-1 row-end-5 border p-2.5 flex flex-col justify-between rounded-lg">
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.strSave} onChange={() => toggleProficencies("strSave")} name="savingThrowStr" id="savingThrowStr" />
                        <p>{getProficencientModifier(baseModifiers.baseStr, "strSave")}</p>
                        <p className="pl-2">Strength</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.dexSave} onChange={() => toggleProficencies("dexSave")} name="savingThrowDex" id="savingThrowDex" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "dexSave")}</p>
                        <p className="pl-2">Dexterity</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.conSave} onChange={() => toggleProficencies("conSave")} name="savingThrowCon" id="savingThrowCon" />
                        <p>{getProficencientModifier(baseModifiers.baseCon, "conSave")}</p>
                        <p className="pl-2">Consitution</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.intSave} onChange={() => toggleProficencies("intSave")} name="savingThrowInt" id="savingThrowInt" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "intSave")}</p>
                        <p className="pl-2">Intellegence</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.wisSave} onChange={() => toggleProficencies("wisSave")} name="savingThrowWis" id="savingThrowWis" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "wisSave")}</p>
                        <p className="pl-2">Wisdom</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.chaSave} onChange={() => toggleProficencies("chaSave")} name="savingThrowCha" id="savingThrowCha" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "chaSave")}</p>
                        <p className="pl-2">Charisma</p>
                    </div>
                    <p className="self-center font-bold">Saving Throws</p>
                </div>

                <div className="col-start-4 col-end-5 row-start-1 row-end-5 flex flex-col justify-between">
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">{levelInfo ? `+${levelInfo.prof_bonus}` : ""}</p>
                        <p className="absolute bottom-0.5 text-sm">Proficency</p>
                    </div>
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">{modifiers.dexterityMod}</p>
                        <p className="absolute bottom-0.5 text-sm">Initiative</p>
                    </div>
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">14</p>
                        <p className="absolute bottom-0.5 text-sm">AC</p>
                    </div>
                </div>

                <div className="col-start-2 col-end-5 row-start-5 row-end-13 border flex flex-col justify-between p-2.5 rounded-lg">
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.acrobatics} onChange={() => toggleProficencies("acrobatics")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "acrobatics")}</p>
                        <p className="pl-2 text-sm">Acrobatics (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.animalHandling} onChange={() => toggleProficencies("animalHandling")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "animalHandling")}</p>
                        <p className="pl-2 text-sm">Animal Handling (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.arcana} onChange={() => toggleProficencies("arcana")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "arcana")}</p>
                        <p className="pl-2 text-sm">Arcana (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.athletics} onChange={() => toggleProficencies("athletics")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseStr, "athletics")}</p>
                        <p className="pl-2 text-sm">Athletics (Str)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.deception} onChange={() => toggleProficencies("deception")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "deception")}</p>
                        <p className="pl-2 text-sm">Deception (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.history} onChange={() => toggleProficencies("history")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "history")}</p>
                        <p className="pl-2 text-sm">History (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.insight} onChange={() => toggleProficencies("insight")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "insight")}</p>
                        <p className="pl-2 text-sm">Insight (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.intimidation} onChange={() => toggleProficencies("intimidation")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "intimidation")}</p>
                        <p className="pl-2 text-sm">Intimidation (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.investigation} onChange={() => toggleProficencies("investigation")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "investigation")}</p>
                        <p className="pl-2 text-sm">Investigation (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.medicine} onChange={() => toggleProficencies("medicine")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "medicine")}</p>
                        <p className="pl-2 text-sm">Medicine (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.nature} onChange={() => toggleProficencies("nature")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "nature")}</p>
                        <p className="pl-2 text-sm">Nature (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.perception} onChange={() => toggleProficencies("perception")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "perception")}</p>
                        <p className="pl-2 text-sm">Perception (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.performance} onChange={() => toggleProficencies("performance")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "performance")}</p>
                        <p className="pl-2 text-sm">Performance (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.persuasion} onChange={() => toggleProficencies("persuasion")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "persuasion")}</p>
                        <p className="pl-2 text-sm">Persuasion (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.religion} onChange={() => toggleProficencies("religion")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "religion")}</p>
                        <p className="pl-2 text-sm">Religion (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.slightOfHand} onChange={() => toggleProficencies("slightOfHand")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "slightOfHand")}</p>
                        <p className="pl-2 text-sm">Sleight of Hand (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.stealth} onChange={() => toggleProficencies("stealth")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "stealth")}</p>
                        <p className="pl-2 text-sm">Stealth (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.survival} onChange={() => toggleProficencies("survival")} name="savingThrow" id="savingThrow" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "survival")}</p>
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
                            <p className="mt-2">{classInfo?.hit_die? `${character.level}d${classInfo.hit_die}` : "loading..."}</p>
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
                
                <div className="col-start-8 col-end-13 row-start-5 row-end-13 border rounded-lg flex flex-col p-2.5 items-center h-full min-h-0">
                    <p>Features</p>
                    <div className="bg-white w-full flex-1 min-h-0 px-2.5 pt-2.5 overflow-y-auto scroll-smooth">
                        {featuresInfo ? (
                            featuresInfo.map((feature) => (
                                <div key={feature.index} className="mb-2">
                                    <span className="font-bold">{feature.name}</span> -{" "}{feature.desc?.join(" ") || ""}
                                </div>
                            ))
                        ) : (
                            <p>Loading Features...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}