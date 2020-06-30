import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/actions";

import MyChips from "../../components/RunningGame/ChipsSection/MyChips";
import CardsGame from "../../components/RunningGame/CardsSection/CardsGame";
import MyBat from "../../components/RunningGame/ChipsSection/MyBat";

import "./RunningGame.scss";

class RunningGame extends Component {
  state = {
    roundStatus: "running",
    showDealerHand: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { gameData, gameWasLost } = this.props;
    const { roundStatus } = this.state;
    const { userValue, totalSum, appValue, userHandObj, appHandObj } = gameData;

    if (
      userValue !== prevProps.gameData.userValue &&
      roundStatus === "running" &&
      userHandObj.length > 2
    ) {
      setTimeout(() => {
        if (userValue > 21) {
          this.setState({
            roundStatus: "loseRound",
            showDealerHand: true
          });
        }
      }, 1000);
    }

    if (totalSum === 0 && roundStatus === "loseRound") {
      if (totalSum === 0) {
        setTimeout(() => {
          gameWasLost("after");
        }, 1000);
      }
    }

    if (
      appValue !== prevProps.gameData.appValue &&
      roundStatus === "running" &&
      appHandObj.length > 2
    ) {
      setTimeout(() => {
        if (appValue > 21 || appValue < userValue) {
          this.setState({
            roundStatus: "winRound"
          });
        } else if (appValue > userValue) {
          this.setState({
            roundStatus: "loseRound"
          });
        } else {
          this.setState({
            roundStatus: "drew"
          });
        }
      }, 1000);
    }
  }

  startNewRound = type => {
    const { afterRoundComplited } = this.props;
    afterRoundComplited(type);

    this.setState({
      roundStatus: "running",
      showDealerHand: false
    });
  };

  hendlUserStand = () => {
    const { gameData, hitCards } = this.props;
    const { deckOfCards, userValue, appValue, appHandObj } = gameData;
    const { deck_id } = deckOfCards;

    if (userValue < appValue) {
      this.setState({
        roundStatus: "loseRound",
        showDealerHand: true
      });
    } else if (userValue === appValue && appHandObj.length === 2) {
      this.setState({
        roundStatus: "drew",
        showDealerHand: true
      });
    } else {
      hitCards(deck_id, 10, "dealerHitCard");
      this.setState({
        showDealerHand: true
      });
    }
  };

  render() {
    const { roundStatus, showDealerHand } = this.state;
    const {
      gameData,
      addChipToBat,
      hitCards,
      quitToHome,
      closeRecoredModal,
      allIn
    } = this.props;
    const { deckOfCards, deckRemaining } = gameData;
    const { deck_id } = deckOfCards;

    return (
      <div className="runningGame">
        <div className="gameBtns">
          <button type="button" onClick={quitToHome}>
            <i className="fa fa-home" />
          </button>
          <button type="button">
            <i className="fa fa-share-alt" />
          </button>
        </div>
        <div className="gameSection">
          <div>
            <MyBat gameData={gameData} />
            <MyChips
              gameData={gameData}
              addChipToBat={chip => addChipToBat(chip)}
              allIn={() => allIn()}
            />
          </div>
          <CardsGame
            gameData={gameData}
            drawCards={(cardsNumber, typeOfDrew) =>
              hitCards(deck_id, cardsNumber, typeOfDrew, deckRemaining)
            }
            RoundStatus={roundStatus}
            startNewRound={type => this.startNewRound(type)}
            hendlUserStand={() => this.hendlUserStand()}
            showDealerHand={showDealerHand}
            closeRecoredModal={() => closeRecoredModal()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameData: state.mainReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChipToBat: chip => dispatch(actions.addBat(chip)),
    allIn: () => dispatch(actions.allIn()),
    hitCards: (deckId, cardsNumber, typeOfDrew, deckRemaining) =>
      dispatch(actions.hitCards(deckId, cardsNumber, typeOfDrew, deckRemaining)),
    afterRoundComplited: type => dispatch(actions.afterRoundComplited(type)),
    gameWasLost: type => dispatch(actions.moveToMenu(type)),
    closeRecoredModal: () => dispatch(actions.closeRecoredModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunningGame);
