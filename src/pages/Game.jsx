import "../styles/Game.css";
import { useState, useEffect } from "react";
import pythonLogo from "../assets/python.png";
import javascriptLogo from "../assets/javascript.png";
import csharpLogo from "../assets/csharp.png";
import cplusplusLogo from "../assets/c++.png";

function Game() {
  const [userData, setUserData] = useState({
    codeLines: 0,
    rebirthCount: 0,
    autoClickers: 0,
  });

  const [autoClickerPrice, setAutoClickerPrice] = useState(10); // Prix initial pour le premier autoclic après la première renaissance
  const [rebirthPrice, setRebirthPrice] = useState(10000); // Prix initial pour le premier rebirth

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  useEffect(() => {
    if (userData.rebirthCount > 0) {
      const newPrice = 10000 * Math.pow(2, userData.rebirthCount);
      setRebirthPrice(newPrice);
    }
  }, [userData.rebirthCount]);

  useEffect(() => {
      const newPrice = 10 * userData.autoClickers *userData.autoClickers;
      setAutoClickerPrice(newPrice);
  
  }, [userData.autoClickers]);

  const addCodeLine = () => {
    let newCodeLines = userData.codeLines;
    const linesToAdd = userData.rebirthCount > 0 ? (userData.rebirthCount * 2) : 1;
    newCodeLines += linesToAdd;
    const newUserData = { ...userData, codeLines: newCodeLines };
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };
  

  const handleRebirth = () => {
    if (userData.codeLines >= rebirthPrice) {
      const newUserData = {
        ...userData,
        rebirthCount: userData.rebirthCount + 1,
        codeLines: 0,
      };
      setUserData(newUserData);
      localStorage.setItem("userData", JSON.stringify(newUserData));
      setRebirthPrice(10000 * Math.pow(2, userData.rebirthCount + 1)); 
      setAutoClickerPrice(10000 * Math.pow(2, userData.rebirthCount + 1)); 
      window.location.reload
    } else {
      alert("Pas assez de lignes de code pour renaître !");
    }
  };

  const handleAutoClickerPurchase = () => {
    if (userData.codeLines >= autoClickerPrice) {
      const newAutoClickers = userData.autoClickers + 1;
      const newCodeLines = userData.codeLines - autoClickerPrice;
      const newUserData = { ...userData, autoClickers: newAutoClickers, codeLines: newCodeLines };
      setUserData(newUserData);
      localStorage.setItem("userData", JSON.stringify(newUserData));
      setAutoClickerPrice(10000 * Math.pow(2, userData.rebirthCount + 1) * 10); 
    } else {
      console.log("Pas assez de lignes de code pour acheter un autoclic !");
    }
  };
  
  useEffect(() => {
    const autoClickInterval = setInterval(() => {
      setUserData(prevUserData => {
        const linesToAdd = prevUserData.rebirthCount > 0 ? (prevUserData.rebirthCount * 2) : 1;
        const newCodeLines = prevUserData.codeLines + (prevUserData.autoClickers * linesToAdd);
        const newUserData = { ...prevUserData, codeLines: newCodeLines };
        localStorage.setItem("userData", JSON.stringify(newUserData)); 
        return newUserData;
      });
    }, 1000);
  
    return () => clearInterval(autoClickInterval);
  }, [userData.autoClickers, userData.rebirthCount]);
  
  

  const logos = [pythonLogo, javascriptLogo, csharpLogo, cplusplusLogo];
  
  return (
    <div className="Game">
      <main>
      

        <h1>{userData.codeLines} Lignes de code</h1>
        <img
          src={logos[userData.rebirthCount % logos.length]}
          alt="logo"
          className="clicker"
          onClick={addCodeLine}
        />
        <button className="nes-btn is-primary" onClick={handleRebirth}>
          Renaître
          ({rebirthPrice})
        </button>
      </main>
      <aside className="shop">
        <h1>Shop</h1>
        <div className="autoclicks">
          <p>Autocliqueurs</p>
          <p>{userData.autoClickers}</p>
          <button 
            className={`nes-btn ${userData.codeLines < autoClickerPrice ? 'is-disabled' : ''}`} 
            onClick={handleAutoClickerPurchase}
            disabled={userData.codeLines < autoClickerPrice}
          >
            Acheter un autoclic ({autoClickerPrice} lignes de code)
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Game;
