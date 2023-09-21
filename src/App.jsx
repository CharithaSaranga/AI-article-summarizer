import { useState } from "react";
import Hero from "./components/hero";
import result from "./components/result";
import "./app.css";
import Result from "./components/result";

function App() {
  return (
    <>
      <main>
        <div className="main">
          
          <div className="all-app">
            <Hero className="hero-section" />
            <Result />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
