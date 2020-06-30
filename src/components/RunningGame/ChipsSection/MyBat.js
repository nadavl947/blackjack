import React from "react";

import "./MyBat.scss";

const myBat = props => {
  const { gameData } = props;
  const { currentBatArray, currentBatSum } = gameData;

  let chipImg = "";
  switch (currentBatArray[0]) {
    case 500:
      chipImg =
        "https://www.shareicon.net/data/256x256/2015/11/01/665261_poker_512x512.png";
      break;
    case 100:
      chipImg =
        "https://cdn4.iconfinder.com/data/icons/sports-glyphs-vol-2/130/coin__casino__game__sport__chip-512.png";
      break;
    case 50:
      chipImg =
        "https://cdn2.iconfinder.com/data/icons/user-interface-icons-bundle-4/32/218-512.png";
      break;
    case 5:
      chipImg =
        "https://cdn3.iconfinder.com/data/icons/casino-solid-icons-1/48/23-512.png";
      break;
    default:
      chipImg = "";
  }

  return (
    <div className="myBat">
      {chipImg ? (
        <div className="bats">
          <img src={chipImg} alt="/" />
          <h3>{`$${currentBatSum}`}</h3>
        </div>
      ) : (
        <h3>Place Your Bets</h3>
      )}
    </div>
  );
};

export default myBat;
