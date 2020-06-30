import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

import BeforMenu from "../components/BeforMenu/BeforMenu";
import RunningGame from "./RunningGame/RunningGame";
import AfterMenu from '../components/AfterMenu/AfterMenu'

import "./GameContainer.scss";

class GameContainer extends Component {
  state = {
    personalBest: null
  };

  componentDidMount(){
    this.checkHighScore()
  }

  componentDidUpdate(prevProps){
    const { gameStatus } = this.props;
    if(gameStatus !== prevProps.gameStatus){
      this.checkHighScore()
    }
  }

  checkHighScore = () => {
    if(localStorage.getItem('personalBest')){
      this.setState({
        personalBest: localStorage.getItem('personalBest')
      })
    }
  }

  render() {
    const { personalBest } = this.state;
    const { gameStatus, startGame, quitToHome } = this.props;

    let componentStatus = <BeforMenu />;

    switch (gameStatus) {
      case "befor":
        componentStatus = <BeforMenu startGame={() => startGame()} personalBest={personalBest} />;
        break;
      case "middle":
        componentStatus = <RunningGame quitToHome={() => quitToHome('befor')} />;
        break;
      case "after":
        componentStatus = <AfterMenu quitToHome={() => quitToHome('befor')} startGame={() => startGame()} />;
        break;
      default:
        componentStatus = <BeforMenu />;
    }

    return <div className="gameContainer">{componentStatus}</div>;
  }
}

const mapStateToProps = state => {
  return {
    gameStatus: state.mainReducer.gameStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(actions.startNewGame()),
    quitToHome: type => dispatch(actions.moveToMenu(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
