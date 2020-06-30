import React from "react";

import "./MyChips.scss";

const myChips = props => {
  const { gameData, addChipToBat, allIn } = props;
  const { chips500, chips100, chips50, chips5, totalSum } = gameData;

  return (
    <div className="chpisSection">
      <div className="chips">
        {chips500.length ? (
          <button type="button" onClick={() => addChipToBat(500)}>
            <img
              src="https://www.shareicon.net/data/256x256/2015/11/01/665261_poker_512x512.png"
              alt="/"
            />
          </button>
        ) : null}
        {chips100.length ? (
          <button type="button" onClick={() => addChipToBat(100)}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/sports-glyphs-vol-2/130/coin__casino__game__sport__chip-512.png"
              alt="/"
            />
          </button>
        ) : null}
        {chips50.length ? (
          <button type="button" onClick={() => addChipToBat(50)}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/user-interface-icons-bundle-4/32/218-512.png"
              alt="/"
            />
          </button>
        ) : null}
        {chips5.length ? (
          <button type="button" onClick={() => addChipToBat(5)}>
            <img
              src="https://cdn3.iconfinder.com/data/icons/casino-solid-icons-1/48/23-512.png"
              alt="/"
            />
          </button>
        ) : null}
      </div>
      <div className="bankMoney">
        <button type="button" onClick={allIn}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/casino-general/512/Poker_Chip-512.png"
            alt="/"
          />
        </button>
        <h3>{`$${totalSum}`}</h3>
      </div>
    </div>
  );
};

export default myChips;
