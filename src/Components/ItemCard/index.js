import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
export default function ItemCard({ pokemonName, pokemonType, pokemonImg }) {
  const emojiType =
    pokemonType == "grass"
      ? "🌿"
      : pokemonType == "fire"
      ? "🔥"
      : pokemonType == "water"
      ? "💧"
      : "🦋";
  return (
    <Card sx={{ width: 300,maxHeight:320 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={pokemonImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemonName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Type: ${pokemonType} ${emojiType}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
