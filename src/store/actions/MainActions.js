import * as actionsTypes from './ActionsTypes';
import axios from 'axios';

const startGame = deckData => ({ type: actionsTypes.START_NEW_GAME, deckData });
const addAChipToBat = chip => ({ type: actionsTypes.ADD_A_CHIP_TO_BAT, chip });
const pushAllChips = () => ({ type: actionsTypes.ALL_IN })

const firstDeal = firstDeal => ({ type: actionsTypes.FIRST_DEAL_HAND, firstDeal });
const hitUserNewCard = userNewCard => ({ type: actionsTypes.HIT_USER_NEW_CARD, userNewCard });
const hitDealerCard = delarNewCard => ({ type: actionsTypes.HIT_DEALER_NEW_CARD, delarNewCard });

const userLostRound = () => ({ type: actionsTypes.USER_LOST_ROUND });
const userWonRound = () => ({ type: actionsTypes.USER_WON_ROUND });
const drewRound = () => ({ type: actionsTypes.DREW_ROUND })

const moveto = toType => ({ type: actionsTypes.MOVE_TO, toType })

const handleRecordModal = () => ({ type: actionsTypes.HANDLE_RECORD_MODAL })

export const startNewGame = () => async dispatch => {
    try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
        const { data = {} } = response;
        dispatch(startGame(data));
    } catch(error){
        console.log(error)
    }
}

export const addBat = (chip) => dispatch => {
    dispatch(addAChipToBat(chip))
}

export const allIn = () => dispatch => {
    dispatch(pushAllChips())
}

export const hitCards = (deckId, cardsNumber, typeOfDrew, deckRemaining) => async dispatch => {
    if(deckRemaining < 40 && typeOfDrew !== 'newGame'){
        try {
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
        } catch(error){
            console.log(error)
        }
    }

    try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardsNumber}`)
        const { data = {} } = response;
        if(typeOfDrew === 'newGame'){
            dispatch(firstDeal(data))
        } 
        else if(typeOfDrew === 'dealerHitCard'){
            dispatch(hitDealerCard(data))
        }
        else {
            dispatch(hitUserNewCard(data))
        }
    } catch(error){
        console.log(error)
    }
}

export const afterRoundComplited = type => dispatch => {
    if(type === 'loseRound'){
        dispatch(userLostRound())
    } else if (type === 'winRound'){
        dispatch(userWonRound())
    } else {
        dispatch(drewRound())
    }
}

export const closeRecoredModal = () => dispatch => {
    dispatch(handleRecordModal())
}

export const moveToMenu = type => dispatch => {
    dispatch(moveto(type))
} 