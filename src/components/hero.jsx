import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { logo } from "../assets";

import "./hero.css";
const Hero = () => {
  return (
    <header className="container">
      <Navbar className="bg-body-transparent">
        <Container>
          <Navbar.Brand href="#home">
            <img alt="" src={logo} className="d-inline-block align-top" />
          </Navbar.Brand>

          <button
            className="git-btn primary"
            variant="dark"
            type="button"
            onClick={() => window.open("https://github.com")}
          >
            Github
          </button>
        </Container>
      </Navbar>
      <h1 className="header-text text-center">
        Summarize Articles with <br />
        <span className="highlight-text fw-bolder">OpenAI GPT-4</span>
      </h1>
      <p className="description fs-5 text-center text-secondary">
        Welcome to the future of effortless reading. Our cutting-edge AI article
        summarizer empowers you to conquer information overload with ease.
        Simply paste any link to an article or website, and watch as our intelligent algorithms distill
        lengthy articles, websites into concise, digestible summaries.
      </p>
    </header>
  );
};

export default Hero;
