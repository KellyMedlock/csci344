import React, { useState, useEffect } from "react";
import { deleteCharacterAndFavorites, getCharacterById, updateCharacter, getFavorites, createFavorite, deleteFavorite } from "../api.js";
import Logo from "../assets/Logo.png";

export default function CharacterSheet({ setPageType, back, characterId }) {
    const [character, setCharacter] = useState(null);
    const [classInfo, setClassInfo] = useState(null);
    const [levelInfo, setLevelInfo] = useState(null);
    const [featuresInfo, setFeaturesInfo] = useState(null);
    const [proficencies, setProficencies] = useState({});
    const [favorite, setFavorite] = useState(null);
    const [editedCharacter, setEditedCharacter] = useState({character_name: "", level: 1,});

    useEffect(() => {
        async function loadCharacter() {
            const data = await getCharacterById(characterId);
            setCharacter(data);

            setEditedCharacter({
                character_name: data.character_name,
                level: data.level,
            });

            const favorites = await getFavorites();

            const existingFavorite = favorites.find(
                (fav) => fav.character?.id === Number(characterId)
            );

            setFavorite(existingFavorite || null);

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
        const confirmed = window.confirm(
            `Are you sure you want to delete ${character.character_name}? This cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        await deleteCharacterAndFavorites(characterId);
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

    async function toggleFavorite() {
        if (favorite) {
            await deleteFavorite(favorite.id);
            setFavorite(null);
        } else {
            const newFavorite = await createFavorite(characterId);
            setFavorite(newFavorite);
        }
    }

    function handleCharacterEdit(e) {
        const { name, value } = e.target;

        setEditedCharacter((prev) => ({
            ...prev,
            [name]: name === "level" ? Number(value) : value,
        }));
    }

    async function saveCharacterEdit() {
        const updatedCharacter = await updateCharacter(characterId, {
            character_name: editedCharacter.character_name,
            level: editedCharacter.level,
        });

        setCharacter((prev) => ({
            ...prev,
            ...updatedCharacter,
        }));
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
    {/* <div className="flex justify-between items-center px-15 mt-6">
                
            </div> */}
    return (
        <div className="bg-[#AAACAD] w-270 min-h-max rounded-3xl shadow-2xl shadow-[#142F3880] m-9 mt-24 flex flex-col overflow-hidden p-2.5 lg:p-6">
            <button onClick={back} type="button" className="absolute top-40 text-5xl hover:text-shadow-lg hover:text-[#4BA9C9]" aria-label="backButton">{"<"}</button>
            <button onClick={submitDelete} type="button" className="absolute top-42 ml-18 xl:left-62 fill-[#4BA9C9] stroke-transparent hover:drop-shadow-lg hover:scale-105 hover:fill-[#59D5FF]" aria-label="deleteButton">
                <svg width={35} height={35} id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    <path className="[stroke-miterlimit:10]" d="M28.13,39.32H11.87c-.89,0-1.63-.68-1.71-1.56l-2.5-28.2h24.66l-2.5,28.2c-.08.88-.82,1.56-1.71,1.56Z"/>
                    <path className="[stroke-miterlimit:10]" d="M10.46,4.8h19.08c2.62,0,4.75,2.13,4.75,4.75H5.71c0-2.62,2.13-4.75,4.75-4.75Z"/>
                    <path className="[stroke-miterlimit:10]" d="M18.8.68h2.39c2.27,0,4.12,1.85,4.12,4.12h-10.63c0-2.27,1.85-4.12,4.12-4.12Z"/>
                </svg>
            </button>
            <button
                onClick={toggleFavorite}
                type="button"
                className="absolute top-42 ml-36 xl:left-72"
                aria-label="favoriteButton"
                >
                <svg className={`${favorite ? "fill-[#4BA9C9] hover:fill-[#59D5FF]" : "fill-none"} stroke-[#4BA9C9] hover:stroke-[#59D5FF] w-9 h-9`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                    <polygon
                    className="stroke-[3px] [stroke-linecap:round] [stroke-linejoin:round]"
                    points="25.83 13.57 38.45 15.44 29.65 24.67 31.78 37.24 20.28 31.74 8.98 37.64 10.66 25 1.55 16.08 14.1 13.78 19.77 2.36 25.83 13.57"
                    />
                </svg>
            </button>
            <div className="flex lg:justify-between items-center text-xs lg:text-base">
                <img src={Logo} alt="Character Class Logo" className="mr-2.5 lg:mr-6 w-18.75 lg:w-24 h-24" />
                <div className="flex flex-col lg:flex-row lg:items-center gap-2.5 lg:gap-6 relative w-full">
                    <input
                        type="text"
                        name="character_name"
                        value={editedCharacter.character_name}
                        onChange={handleCharacterEdit}
                        onBlur={saveCharacterEdit}
                        className="bg-white w-full lg:w-64 h-6 lg:h-10 rounded-lg lg:rounded-none flex items-center pl-1"
                        aria-label="characterName"
                    />
                    <div className="flex flex-col gap-2.5 lg:gap-5 w-full">
                        <div className="flex flex-row gap-2.5 lg:gap-6">
                            <div className="bg-white w-[50%] lg:w-48 h-6 lg:h-10 rounded-lg lg:rounded-none flex items-center pl-1 capitalize gap-1">
                                <span>{character.class_dnd}</span>

                                <select
                                    name="level"
                                    value={editedCharacter.level}
                                    onChange={handleCharacterEdit}
                                    onBlur={saveCharacterEdit}
                                    className="bg-white"
                                    aria-label="characterLevel"
                                >
                                    {[...Array(20)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className="bg-white w-[50%] lg:w-48 h-6 lg:h-10 rounded-lg lg:rounded-none flex items-center pl-1 capitalize">{character.background}</p>
                            <p className="hidden bg-white w-48 h-10 lg:flex items-center pl-1">{character.owner.username}</p>
                        </div>
                        <div className="flex flex-row gap-2.5 lg:gap-6">
                            <p className="bg-white w-[50%] lg:w-48 h-6 lg:h-10 rounded-lg lg:rounded-none flex items-center pl-1 capitalize">{character.race}</p>
                            <select name="alignment" id="alignment" className="bg-white w-[50%] lg:w-48 h-6 lg:h-10 rounded-lg lg:rounded-none">
                                <option value="lawfulGood">Lawful Good</option>
                                <option value="neutralGood">Neutral Good</option>
                                <option value="chaoticGood">Chaotic Good</option>
                                <option value="lawfulNeutral">Lawful Neutral</option>
                                <option value="neutral">Neutral</option>
                                <option value="chaoticNeutral">Chaotic Neutral</option>
                                <option value="lawfulEvil">Lawful Evil</option>
                                <option value="neutralEvil">Neutral Evil</option>
                                <option value="chaoticEvil">Chaotic Evil</option>
                            </select>
                            <input type="text" name="experience" id="experience" placeholder="EXP" className="hidden bg-white w-48 h-10 lg:inline-block" aria-label="experience" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-12 gap-2.5 mt-2.5 lg:mt-5 min-h-0 lg:max-h-176">
                <div className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-13 flex flex-row lg:flex-col justify-between">
                    <div className="bg-white w-11 h-11 lg:w-19 lg:h-19 flex flex-col items-center pt-0.5 lg:pt-2 relative">
                        <p className="text-xl lg:text-5xl">{modifiers.strengthMod}</p>
                        <p className=" absolute bottom-0 text-xs lg:text-base">STR {character.character_stats.strength}</p>
                    </div>
                    <div className="bg-white w-11 h-11 lg:w-19 lg:h-19 flex flex-col items-center pt-0.5 lg:pt-2 relative">
                        <p className="text-xl lg:text-5xl">{modifiers.dexterityMod}</p>
                        <p className=" absolute bottom-0 text-xs lg:text-base">DEX {character.character_stats.dexterity}</p>
                    </div>
                    <div className="bg-white w-11 h-11 lg:w-19 lg:h-19 flex flex-col items-center pt-0.5 lg:pt-2 relative">
                        <p className="text-xl lg:text-5xl">{modifiers.constitutionMod}</p>
                        <p className=" absolute bottom-0 text-xs lg:text-base">CON {character.character_stats.constitution}</p>
                    </div>
                    <div className="bg-white w-11 h-11 lg:w-19 lg:h-19 flex flex-col items-center pt-0.5 lg:pt-2 relative">
                        <p className="text-xl lg:text-5xl">{modifiers.intelligenceMod}</p>
                        <p className=" absolute bottom-0 text-xs lg:text-base">INT {character.character_stats.intelligence}</p>
                    </div>
                    <div className="bg-white w-11 h-11 lg:w-19 lg:h-19 flex flex-col items-center pt-0.5 lg:pt-2 relative">
                        <p className="text-xl lg:text-5xl">{modifiers.wisdomMod}</p>
                        <p className=" absolute bottom-0 text-xs lg:text-base">WIS {character.character_stats.wisdom}</p>
                    </div>
                    <div className="bg-white w-11 h-11 lg:w-19 lg:h-19 flex flex-col items-center pt-0.5 lg:pt-2 relative">
                        <p className="text-xl lg:text-5xl">{modifiers.charismaMod}</p>
                        <p className=" absolute bottom-0 text-xs lg:text-base">CHA {character.character_stats.charisma}</p>
                    </div>
                </div>

                <div className="lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-5 border p-2.5 flex flex-col justify-between rounded-lg text-sm lg:text-base gap-2.5 lg:gap-0 order-3">
                    <div className="h-full flex justify-between lg:justify-start lg:flex-col">
                        <div className="h-full flex flex-col justify-around">
                            <div className="flex gap-1">
                                <input type="checkbox" checked={!!proficencies.strSave} onChange={() => toggleProficencies("strSave")} name="savingThrowStr" id="savingThrowStr" aria-label="proficencyToggle" />
                                <p>{getProficencientModifier(baseModifiers.baseStr, "strSave")}</p>
                                <p className="pl-2">Strength</p>
                            </div>
                            <div className="flex gap-1">
                                <input type="checkbox" checked={!!proficencies.dexSave} onChange={() => toggleProficencies("dexSave")} name="savingThrowDex" id="savingThrowDex" aria-label="proficencyToggle" />
                                <p>{getProficencientModifier(baseModifiers.baseDex, "dexSave")}</p>
                                <p className="pl-2">Dexterity</p>
                            </div>
                            <div className="flex gap-1">
                                <input type="checkbox" checked={!!proficencies.conSave} onChange={() => toggleProficencies("conSave")} name="savingThrowCon" id="savingThrowCon" aria-label="proficencyToggle" />
                                <p>{getProficencientModifier(baseModifiers.baseCon, "conSave")}</p>
                                <p className="pl-2">Consitution</p>
                            </div>
                        </div>
                        <div className="h-full flex flex-col justify-around">
                            <div className="flex gap-1">
                                <input type="checkbox" checked={!!proficencies.intSave} onChange={() => toggleProficencies("intSave")} name="savingThrowInt" id="savingThrowInt" aria-label="proficencyToggle" />
                                <p>{getProficencientModifier(baseModifiers.baseInt, "intSave")}</p>
                                <p className="pl-2">Intellegence</p>
                            </div>
                            <div className="flex gap-1">
                                <input type="checkbox" checked={!!proficencies.wisSave} onChange={() => toggleProficencies("wisSave")} name="savingThrowWis" id="savingThrowWis" aria-label="proficencyToggle" />
                                <p>{getProficencientModifier(baseModifiers.baseWis, "wisSave")}</p>
                                <p className="pl-2">Wisdom</p>
                            </div>
                            <div className="flex gap-1">
                                <input type="checkbox" checked={!!proficencies.chaSave} onChange={() => toggleProficencies("chaSave")} name="savingThrowCha" id="savingThrowCha" aria-label="proficencyToggle" />
                                <p>{getProficencientModifier(baseModifiers.baseCha, "chaSave")}</p>
                                <p className="pl-2">Charisma</p>
                            </div>
                        </div>
                    </div>
                    <p className="self-center font-bold">Saving Throws</p>
                </div>

                <div className="lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-5 flex flex-col justify-between order-2">
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">{levelInfo ? `+${levelInfo.prof_bonus}` : ""}</p>
                        <p className="absolute bottom-0.5 text-sm">Proficency</p>
                    </div>
                    <div className="hidden w-19 h-19 border rounded-lg lg:flex flex-col items-center relative pt-2">
                        <p className="text-4xl">{modifiers.dexterityMod}</p>
                        <p className="absolute bottom-0.5 text-sm">Initiative</p>
                    </div>
                    <div className="w-19 h-19 border rounded-lg flex flex-col items-center relative pt-2">
                        <p className="text-4xl">14</p>
                        <p className="absolute bottom-0.5 text-sm">AC</p>
                    </div>
                </div>

                <div className="lg:col-start-2 lg:col-end-5 lg:row-start-5 lg:row-end-13 border flex flex-col justify-between p-2.5 rounded-lg order-3">
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.acrobatics} onChange={() => toggleProficencies("acrobatics")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "acrobatics")}</p>
                        <p className="pl-2 text-sm">Acrobatics (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.animalHandling} onChange={() => toggleProficencies("animalHandling")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "animalHandling")}</p>
                        <p className="pl-2 text-sm">Animal Handling (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.arcana} onChange={() => toggleProficencies("arcana")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "arcana")}</p>
                        <p className="pl-2 text-sm">Arcana (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.athletics} onChange={() => toggleProficencies("athletics")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseStr, "athletics")}</p>
                        <p className="pl-2 text-sm">Athletics (Str)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.deception} onChange={() => toggleProficencies("deception")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "deception")}</p>
                        <p className="pl-2 text-sm">Deception (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.history} onChange={() => toggleProficencies("history")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "history")}</p>
                        <p className="pl-2 text-sm">History (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.insight} onChange={() => toggleProficencies("insight")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "insight")}</p>
                        <p className="pl-2 text-sm">Insight (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.intimidation} onChange={() => toggleProficencies("intimidation")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "intimidation")}</p>
                        <p className="pl-2 text-sm">Intimidation (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.investigation} onChange={() => toggleProficencies("investigation")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "investigation")}</p>
                        <p className="pl-2 text-sm">Investigation (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.medicine} onChange={() => toggleProficencies("medicine")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "medicine")}</p>
                        <p className="pl-2 text-sm">Medicine (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.nature} onChange={() => toggleProficencies("nature")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "nature")}</p>
                        <p className="pl-2 text-sm">Nature (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.perception} onChange={() => toggleProficencies("perception")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "perception")}</p>
                        <p className="pl-2 text-sm">Perception (Wis)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.performance} onChange={() => toggleProficencies("performance")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "performance")}</p>
                        <p className="pl-2 text-sm">Performance (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.persuasion} onChange={() => toggleProficencies("persuasion")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseCha, "persuasion")}</p>
                        <p className="pl-2 text-sm">Persuasion (Cha)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.religion} onChange={() => toggleProficencies("religion")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseInt, "religion")}</p>
                        <p className="pl-2 text-sm">Religion (Int)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.slightOfHand} onChange={() => toggleProficencies("slightOfHand")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "slightOfHand")}</p>
                        <p className="pl-2 text-sm">Sleight of Hand (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.stealth} onChange={() => toggleProficencies("stealth")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseDex, "stealth")}</p>
                        <p className="pl-2 text-sm">Stealth (Dex)</p>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" checked={!!proficencies.survival} onChange={() => toggleProficencies("survival")} name="savingThrow" id="savingThrow" aria-label="proficencyToggle" />
                        <p>{getProficencientModifier(baseModifiers.baseWis, "survival")}</p>
                        <p className="pl-2 text-sm">Survival (Wis)</p>
                    </div>
                </div>

                <div className="lg:col-start-5 lg:col-end-8 lg:row-start-1 lg:row-end-5 border rounded-lg flex flex-col items-center justify-around p-2.5 order-1">
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
                                <label className="text-xs" htmlFor="successes">Successes</label>
                                <form className="flex gap-0.5" name="successes" id="successes">
                                    <input type="checkbox" name="success" id="success1" aria-label="success" />
                                    <input type="checkbox" name="success" id="success2" aria-label="success" />
                                    <input type="checkbox" name="success" id="success3" aria-label="success" />
                                </form>
                            </div>
                            <div className="flex justify-end gap-1">
                                <label className="text-xs" htmlFor="failures">Failures</label>
                                <form className="flex gap-0.5" name="failures" id="failures">
                                    <input type="checkbox" name="failure" id="failure1" aria-label="failure" />
                                    <input type="checkbox" name="failure" id="failure2" aria-label="failure" />
                                    <input type="checkbox" name="failure" id="failure3" aria-label="failure" />
                                </form>
                            </div>
                            <p className="self-center">Death Saves</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-start-5 lg:col-end-8 lg:row-start-5 lg:row-end-9 border rounded-lg order-4">

                </div>
                
                <div className="lg:col-start-5 lg:col-end-8 lg:row-start-9 lg:row-end-13 border rounded-lg order-4">

                </div>
                
                <div className="lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-5 border rounded-lg order-4">

                </div>
                
                <div className="lg:col-start-8 lg:col-end-13 lg:row-start-5 lg:row-end-13 border rounded-lg flex flex-col p-2.5 items-center h-full min-h-0 order-4">
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