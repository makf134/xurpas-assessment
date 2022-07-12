import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../../Components/ItemCard";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);

  async function getPokemons() {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
    );
    const data = res.data.results;
    data.forEach(async (element) => {
      const pokemonRes = await axios.get(element.url);
      const pokemonObj = pokemonRes.data;
      setPokemons((prev) => [...prev, pokemonObj]);
    });
  }

  useEffect(() => {
    getPokemons();
  }, []);

  if (pokemons.length > 0)
    return (
      <div className="home-container">
        <div className="items-container">
          <Grid container spacing={3}>
            {pokemons.map((curr, idx) => {
              return (
                <Grid item xs={3} key={idx}>
                  <div
                    className="grid-item"
                    onClick={() => navigate(`/pokemon/${curr.name}`)}
                  >
                    <Card
                      pokemonName={curr.name}
                      pokemonImg={curr.sprites.front_default}
                      pokemonType={curr.types[0].type.name}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
}
