import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
export default function PokemonPage() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [abilities, setAbilities] = useState("");
  const [stats, setStats] = useState("");
  const [err, setErr] = useState(null);
  const { pokeName } = useParams();

  async function getPokemon() {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      const data = res.data;
      setSelectedPokemon(data);
    } catch (err) {
      setErr(err);
    }
  }

  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      const newAbilities = selectedPokemon.abilities
        .map((curr) => curr.ability.name)
        .join();
      const newStats = selectedPokemon.stats.map((curr) => curr.base_stat);

      setAbilities(newAbilities);
      setStats(newStats);
    }
  }, [selectedPokemon]);

  if (selectedPokemon !== null)
    return (
      <div className="pokemon-container">
        {err ? (
          <div>Error! Something went wrong.</div>
        ) : (
          <div className="info-container">
            <div className="info-top">
              <img
                src={selectedPokemon.sprites.other.dream_world.front_default}
                className="pokemon-image"
              />
              <div className="info-top-right">
                <Typography
                  variant="h2"
                  component="div"
                >{`Name: ${selectedPokemon.name}`}</Typography>
                <Typography
                  variant="h2"
                  component="div"
                  sx={{ margin: "10px 0" }}
                >{`Type: ${selectedPokemon.types[0].type.name} ${
                  selectedPokemon.types[0].type.name == "grass"
                    ? "🌿"
                    : selectedPokemon.types[0].type.name == "fire"
                    ? "🔥"
                    : selectedPokemon.types[0].type.name == "water"
                    ? "💧"
                    : "🦋"
                }`}</Typography>
                <Typography
                  variant="h2"
                  component="div"
                >{`Abilities: ${abilities}`}</Typography>
              </div>
            </div>
            <div className="info-bottom">
              <Typography
                sx={{ marginLeft: "15%" }}
                variant="h4"
                component="div"
              >
                Stats:
              </Typography>
              <div className="info-stats-container">
                <span className="info-stats-text">{`HP: ${stats[0]} ❤️`}</span>
                <span className="info-stats-text">{`Attack: ${stats[1]} 🗡️`}</span>
                <span className="info-stats-text">{`Defense: ${stats[2]} 🛡️`}</span>
                <span className="info-stats-text">{`Special Attack: ${stats[3]} ⚔️`}</span>
                <span className="info-stats-text">
                  {`Special Defense: ${stats[4]} 🔰`}{" "}
                </span>
                <span className="info-stats-text">{`Speed: ${stats[5]} 💨`}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
