import React, { Component } from "react";

import "./AfterMenu.scss";

class AfterMenu extends Component {
  state = {
    initial: 0
  };

  render() {
    const { quitToHome, startGame } = this.props;
    return (
      <div className="afterMenu">
        <h3>Out of Credits</h3>
        <button type="button" onClick={startGame}>
          <p>New Game</p>
        </button>
        <button type="button" onClick={quitToHome}>
          <p>Home Menu</p>
        </button>
      </div>
    );
  }
}

export default AfterMenu;
