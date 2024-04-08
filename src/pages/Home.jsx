import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <h1 className="welcome-message">Bienvenue !</h1>
      <div className="buttons">
        <Link to={"/game"} className="nes-btn is-primary">
          Jouer
        </Link>
        {/* <Link to={"/settings"} className="nes-btn is-primary">
          Options
        </Link>
        <Link to={"/credits"} className="nes-btn is-primary">
          Credits
        </Link> */}
      </div>
      <footer>
        <p>
          Fait avec coeur par {""}
          <a href="https://github.com/RetrozDev" target="_blank">
            Barboza Ryan
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
