import { useCallback, useMemo, useState } from "react";
import "./App.scss";
import Hero from "./components/Hero";
import HomePage from "./pages/HomePage";

function App() {
  const [count, setCount] = useState(0);

  const name = useMemo(() => "ngoc", []);
  const handleHeroClick = useCallback(() => {}, []);

  return (
    <div className="app">
      <HomePage></HomePage>

      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>

      <Hero name={name} onClick={handleHeroClick}></Hero>
    </div>
  );
}

export default App;
