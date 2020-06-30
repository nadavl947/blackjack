import React, { Component } from "react";

import "./EndRoundStatus.scss";

class EndRoundStatus extends Component {
  state = {
    title: ""
  };

  componentDidMount() {
    this.endRoundType();
  }

  endRoundType = () => {
    const { RoundStatus, startNewRound } = this.props;

    if (RoundStatus === "loseRound") {
      this.setState({
        title: "Dealer Wins!!"
      });
    } else if (RoundStatus === "winRound") {
      this.setState({
        title: "You Win!!"
      });
    } else {
      this.setState({
        title: "Push"
      });
    }

    setTimeout(() => {
      startNewRound(RoundStatus);
    }, 2000);
  };

  render() {
    const { title } = this.state;
    const { RoundStatus } = this.props;
    return (
      <div className="endRoundStatus">
        <h1 className={RoundStatus}>{title}</h1>
      </div>
    );
  }
}

export default EndRoundStatus;
