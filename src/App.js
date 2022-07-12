import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import PokemonImage from "../src/assets/pokeball.png";
import HomePage from "./Pages/HomePage";
import PokemonPage from "./Pages/PokemonPage";
function App() {
  return (
    <Router>
      <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
        <div className="navbar">
          <div className="navbar-text">Pokedex</div>
          <img src={PokemonImage} className="navbar-img" />
        </div>
      </Link>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/pokemon/:pokeName" element={<PokemonPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
