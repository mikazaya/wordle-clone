import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import { solutions } from "./solutions.ts";

function App() {
  const [solution, setSolution] = useState("");

  useEffect(() => {
    setSolution(
      solutions[Math.floor(Math.random() * solutions.length)].toUpperCase()
    );
  }, []);

  return (
    <main>
      <nav>WORDLE</nav>
      <div className="game">
        <Wordle solution={solution} />
      </div>
    </main>
  );
}

export default App;
