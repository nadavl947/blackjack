import React, { Component } from "react";

import "./BeforMenu.scss";

class BeforMenu extends Component {
  state = {
    initial: 0
  };

  render() {
    const { startGame, personalBest } = this.props;

    return (
      <div className="beforMenu">
        <h1>BLACKJACK</h1>
        <img
          src="https://www.shareicon.net/data/128x128/2016/02/01/712102_poker_512x512.png"
          alt="/"
        />
        <button type="button" onClick={startGame}>
          <i className="fa fa-play-circle" />
          <p>Start Game</p>
        </button>
        {personalBest && (
          <div>
            <h3>{`Record: $${personalBest}`}</h3>
          </div>
        )}
      </div>
    );
  }
}

export default BeforMenu;
