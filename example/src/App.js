import React, { useRef } from "react";

import Scroller from "./Scroller";

import classes from "./App.module.css";

function PhilosophicalTicker() {
  const texts = [
    "Every ending is a new Beginning",
    "The Weatherman keeps on complaining",
    "Egg Sandwiches are no real Dinner",
    "Movie night canceled",
    "I simply cannot remember my Dreams",
    "But at least I do not remember my Nightmares either",
    "Sometimes I really wonder",
    "Seize the means of Production",
    "And seize the Day as well",
    "Two people make a Party",
    "And here we go again",
  ];

  const childFunction = (index) => (
    <div className={classes.philoTicker}>{texts[index % texts.length]}</div>
  );

  return (
    <Scroller
      childFunction={childFunction}
      mode={"loop"}
      height={"4.8rem"}
      speed={-160}
      loopGap={48}
    />
  );
}

function InfoTicker() {
  const texts = [
    "Change the speed and direction by clicking and moving the tickers",
    "The below elements are procedurally generated",
  ];

  const childFunction = (index) => (
    <div className={classes.infoTicker}>{texts[index % texts.length]}</div>
  );

  return (
    <Scroller
      childFunction={childFunction}
      mode={"single"}
      height={"4.8rem"}
      speed={-80}
      position={200}
    />
  );
}

function Card1(props) {
  const spinning = useRef(Math.random() > 0.5);

  return (
    <div
      className={
        spinning.current ? classes.pokerTickerI : classes.pokerTickerII
      }
    >
      &#9824;
    </div>
  );
}

function Card2(props) {
  const spinning = useRef(Math.random() > 0.5);

  return (
    <div
      className={
        spinning.current ? classes.pokerTickerI : classes.pokerTickerII
      }
    >
      &#9827;
    </div>
  );
}

function Card3(props) {
  const spinning = useRef(Math.random() > 0.5);

  return (
    <div
      className={
        spinning.current ? classes.pokerTickerI : classes.pokerTickerII
      }
    >
      &#9829;
    </div>
  );
}

function Card4(props) {
  const spinning = useRef(Math.random() > 0.5);

  return (
    <div
      className={
        spinning.current ? classes.pokerTickerI : classes.pokerTickerII
      }
    >
      &#9830;
    </div>
  );
}

function PokerTicker() {
  const texts = [<Card1 />, <Card2 />, <Card3 />, <Card4 />];

  const childFunction = (index) => <div>{texts[index % texts.length]}</div>;

  return (
    <Scroller
      childFunction={childFunction}
      mode={"chain"}
      height={"3.2rem"}
      speed={100}
    />
  );
}

function BaseTicker() {
  const childFunction = (index) => (
    <div className={classes.baseTicker}>
      <span className={classes.plus}>+</span>
      <span>&nbsp;Ay Caramba&nbsp;</span>
      <span className={classes.plus}>+</span>
    </div>
  );

  return (
    <div className={classes.baseTickerWrapper}>
      <Scroller
        childFunction={childFunction}
        mode={"chain"}
        height={"3.2rem"}
        speed={100}
      />
    </div>
  );
}

function ColorTicker() {
  const colors = [
    "#fec5bc",
    "#fcd5cd",
    "#fae1dd",
    "#f8edeb",
    "#e8e8e4",
    "#d8e2da",
    "#ece4cb",
    "#ffe5d8",
    "#ffd7bb",
    "#fec89b",
  ];

  const childFunction = (index) => (
    <div
      className={classes.colorTicker}
      style={{
        backgroundColor: colors[index % colors.length],
        width: `${(index % colors.length) * 1.6 + 3.2}rem`,
      }}
    />
  );

  return (
    <Scroller
      childFunction={childFunction}
      mode={"chain"}
      height={"12.8rem"}
      speed={200}
      position={600}
    />
  );
}

function App() {
  return (
    <div className="App">
      <BaseTicker />
      <InfoTicker />
      <PokerTicker />
      <ColorTicker />
      <PhilosophicalTicker />
    </div>
  );
}

export default App;
