import React from "react";

import EndRoundStatus from "./EndRoundStatus";
import SelectedCards from "./SelectedCards";
import NewRecordModal from './NewRecordModal';

import "./CardsGame.scss";

const cardsGame = props => {
  const { gameData, drawCards, RoundStatus, startNewRound, showDealerHand, closeRecoredModal } = props;
  const { userHandObj, appHandObj, userValue, appValue, isNewRecord, totalSum } = gameData;

  const userButtons = () => {
    const { currentBatSum, userValue } = gameData;
    if (currentBatSum !== 0 && !userValue) {
      return (
        <button type="button" onClick={() => drawCards(4, 'newGame')}>
          Deal
        </button>
      );
    } else if (currentBatSum !== 0 && userValue) {
      return (
        <button type="button" onClick={() => drawCards(1, 'hitUser')} disabled={RoundStatus !== 'running'}>
          Hit
        </button>
      );
    } 
    else {
      return;
    }
  };

  const appButtons = () => {
    const { appHandObj } = gameData;
    const { hendlUserStand } = props;
    if (appHandObj.length) {
      return (
        <button type="button" onClick={hendlUserStand}>
          Stand
        </button>
      );
    } else {
      return;
    }
  };

  return (
    <div className="cardsSection">
      {isNewRecord ? <NewRecordModal closeRecoredModal={closeRecoredModal} totalSum={totalSum} /> : null}
      <div className="cardsGameHeader">
        <img
          src="https://www.shareicon.net/data/128x128/2016/10/11/841505_man_512x512.png"
          alt="/"
        />
      </div>

      <div className="cardGameField">

        {RoundStatus === 'loseRound' && <EndRoundStatus RoundStatus={RoundStatus} startNewRound={() => startNewRound(RoundStatus)} />}
        {RoundStatus === 'winRound' && <EndRoundStatus RoundStatus={RoundStatus} startNewRound={() => startNewRound(RoundStatus)} />}\
        {RoundStatus === 'drew' && <EndRoundStatus RoundStatus={RoundStatus} startNewRound={() => startNewRound(RoundStatus)} />}

        <div className="userSection">
          <h3>{userValue}</h3>
          <div className="selectedCards">
            {userHandObj.map(item => {
              return <SelectedCards card={item}  />;
            })}
          </div>
          <div className="fieldBtns">
            {userButtons()}
          </div>
        </div>

        <div className="userSection">
          {appHandObj.length ? (
            <>
              <h3>{showDealerHand ? `Dealer ${appValue}` : 'Dealer'}</h3>
              <div className="selectedCards">
                {showDealerHand ? (
                  <div>
                    {appHandObj.map((item, index) => {
                        return <SelectedCards isUserHand={false} card={item} />;
                    })}
                  </div>
                ) : (
                  <div>
                    {appHandObj.length ? <img className="appCard" src="https://images.squarespace-cdn.com/content/v1/5abd8db4620b85fa99f15131/1542340370129-WV43BVUJLUTWL6FRRK52/ke17ZwdGBToddI8pDm48kLmb52_AaM1umQfsXJ-OeXUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2jNOgpIUaFWvk_SWVQMXasJxW8tjlo6POoa0ep6ALAnEKMshLAGzx4R3EDFOm1kBS/Card+Back+2.0+-+Poker+Size+-+Red_shw.png" alt="/" /> : null}
                    {appHandObj.map((item, index) => {
                      if(index !== 0){
                        return <SelectedCards isUserHand={false} card={item} />;
                      }
                    })}
                  </div>
                )}
              </div>
          </>
          ) : null}
          <div className="fieldBtns">
            {appButtons()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default cardsGame;
