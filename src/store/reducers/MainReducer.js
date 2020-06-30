import {combineReducers} from 'redux';
import * as actionTypes from '../actions/ActionsTypes';

const initialState = {
    gameStatus: 'befor',
    isNewRecord: null,
    deckOfCards: {},
    chips500: [],
    chips100: [],
    chips50: [],
    chips5: [],
    totalSum: null,
    currentBatArray: [],
    currentBatSum: 0,
    userHandObj: [],
    userValue: null,
    appHandObj: [],
    appValue: null,
    deckRemaining: null,
}

const startGame = (state, action) => {
    const { deckData } = action;
    return {
        ...state,
        gameStatus: 'middle',
        deckOfCards: deckData,
        chips500: [500, 500, 500, 500],
        chips100: [100, 100, 100],
        chips50: [50, 50, 50],
        chips5: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        totalSum: 2500,
    }
}

const pushNewBat = (state, action) => {
    const { chip } = action;
    let new500Array = [...state.chips500];
    let new100Array = [...state.chips100];
    let new50Array = [...state.chips50];
    let new5Array = [...state.chips5];
    if(chip === 500){
        new500Array.pop()
    }
    if(chip === 100){
        new100Array.pop()
    }
    if(chip === 50){
        new50Array.pop()
    }
    if(chip === 5){
        new5Array.pop()
    }
    return {
        ...state,
        currentBatSum: state.currentBatSum + chip,
        totalSum: state.totalSum - chip,
        currentBatArray: [chip, ...state.currentBatArray],
        chips500: new500Array,
        chips100: new100Array,
        chips50: new50Array,
        chips5: new5Array,
    }
}

const pushAllChips = state => {

    const newCurrentBatArray = [...state.currentBatArray, ...state.chips500, ...state.chips100, ...state.chips50, ...state.chips5];

    return {
        ...state,
        currentBatSum: state.totalSum + state.currentBatSum,
        currentBatArray: newCurrentBatArray,
        totalSum: 0,
        chips500: [],
        chips100: [],
        chips50: [],
        chips5: [],
    }
}

const hendleFirstDeal = (state, action) => {
    const { firstDeal } = action;
    const { cards, remaining } = firstDeal;

    let userNewHend = [...state.userHandObj];
    let appNewHend = [...state.appHandObj];
    let userNewCount = state.userValue;
    let appNewCount = state.appValue;

    cards.forEach((item, index) => {
        let isUserArrayWithAce = userNewHend.some( item => item['value'] === 'ACE' );
        let isAppArrayWithAce = appNewHend.some( item => item['value'] === 'ACE' );

        if(index < 2){
            userNewHend.push(item)
            if(['KING', 'JACK', 'QUEEN'].includes(item.value)){
                userNewCount = userNewCount + 10
            } else if(item.value === 'ACE' && isUserArrayWithAce){
                userNewCount = userNewCount + 1
            }
            else if(item.value === 'ACE'){
                userNewCount = userNewCount + 11
            }
            else {
                userNewCount = userNewCount + Number(item.value)
            }
        } else {
            appNewHend.push(item)
            if(['KING', 'JACK', 'QUEEN'].includes(item.value)){
                appNewCount = appNewCount + 10
            } else if(item.value === 'ACE' && isAppArrayWithAce){
                appNewCount = appNewCount + 1
            }
            else if(item.value === 'ACE'){
                appNewCount = appNewCount + 11
            }
            else {
                appNewCount = appNewCount + Number(item.value)
            }
        }
    });

    return {
        ...state,
        userHandObj: userNewHend,
        appHandObj: appNewHend,
        deckRemaining: remaining,
        userValue: userNewCount,
        appValue: appNewCount,
        isNewRecord: null,
    }
}

const hitUser = (state, action) => {
    const { userNewCard } = action;
    const { cards, remaining } = userNewCard

    let userNewHit = [...state.userHandObj];
    let userNewHitCout = state.userValue;

    cards.forEach(item => {
        userNewHit.push(item)
        if(['KING', 'JACK', 'QUEEN'].includes(item.value)){
            userNewHitCout = userNewHitCout + 10
        } else if(item.value === 'ACE'){
            if(userNewHitCout <= 10) {
                userNewHitCout = userNewHitCout + 11
            } else {
                userNewHitCout = userNewHitCout + 1
            }
        }
        else {
            userNewHitCout = userNewHitCout + Number(item.value)
        }
    })

    let isArrayWithAce = userNewHit.some( item => item['value'] === 'ACE' );

    if(userNewHitCout > 21 && isArrayWithAce) {
        let secondNewArrayHit = [...userNewHit];

        secondNewArrayHit.forEach(item => {
            if(item.value === 'ACE'){
                item.value = 'XXX'
            }
        })
        userNewHit = secondNewArrayHit
        userNewHitCout = userNewHitCout - 10;
    }

    return {
        ...state,
        userHandObj: userNewHit,
        userValue: userNewHitCout,
        deckRemaining: remaining
    }
}

const hitDealer = (state, action) => {
    const { delarNewCard } = action;
    const { cards, remaining } = delarNewCard;

    let appNewHit = [...state.appHandObj];
    let appNewHitCout = state.appValue;

    cards.forEach(item => {
        if(appNewHitCout < 18 || (appNewHitCout >= 18 && state.userValue > appNewHitCout)){
            appNewHit.push(item)
            if(['KING', 'JACK', 'QUEEN'].includes(item.value)){
                appNewHitCout = appNewHitCout + 10
            } else if(item.value === 'ACE'){
                if(appNewHitCout <= 10) {
                    appNewHitCout = appNewHitCout + 11
                } else {
                    appNewHitCout = appNewHitCout + 1
                }
            }
            else {
                appNewHitCout = appNewHitCout + Number(item.value)
            }
        }
    })

    let isArrayWithAce = appNewHit.some( item => item['value'] === 'ACE' );

    if(appNewHitCout > 21 && isArrayWithAce) {
        let secondNewArrayHit = [...appNewHit];

        secondNewArrayHit.forEach(item => {
            if(item.value === 'ACE'){
                item.value = 'XXX'
            }
        })
        appNewHit = secondNewArrayHit
        appNewHitCout = appNewHitCout - 10;
    }

    return {
        ...state,
        appHandObj: appNewHit,
        appValue: appNewHitCout,
        deckRemaining: remaining
    }
}

const userLostRound = state => {
    return {
        ...state,
        userValue: null,
        appValue: null,
        totalSum: state.totalSum,
        currentBatSum: 0,
        currentBatArray: [],
        userHandObj: [],
        appHandObj: [],
    }
}

const userWinRound = state => {

    const newTotalSum = (state.currentBatSum * 2) + state.totalSum;
    const newChipsToMap = [...state.currentBatArray, ...state.currentBatArray];

    let new500 = [...state.chips500];
    let new100 = [...state.chips100];
    let new50 = [...state.chips50];
    let new5 = [...state.chips5];

    let isNewRecordNew = null;

    newChipsToMap.forEach(item => {
        if(item === 500){
            new500.push(item)
        } else if(item === 100){
            new100.push(item)
        } else if(item === 50){
            new50.push(item)
        } else {
            new5.push(item)
        }
    })

    if(localStorage.getItem('personalBest')){
        if(localStorage.getItem('personalBest') < newTotalSum && newTotalSum > 2500){
            localStorage.setItem('personalBest', newTotalSum)
            isNewRecordNew = true;
        }
    } else {
        localStorage.setItem('personalBest', newTotalSum)
        isNewRecordNew = true;
    }

    return {
        ...state,
        userValue: null,
        appValue: null,
        totalSum: newTotalSum,
        currentBatSum: 0,
        currentBatArray: [],
        userHandObj: [],
        appHandObj: [],
        chips500: new500,
        chips100: new100,
        chips50: new50,
        chips5: new5,
        isNewRecord: isNewRecordNew
    }
} 

const moveToStep = action => {
    const { toType } = action;
    return {
        gameStatus: toType,
        deckOfCards: {},
        chips500: [],
        chips100: [],
        chips50: [],
        chips5: [],
        totalSum: null,
        currentBatArray: [],
        currentBatSum: 0,
        userHandObj: [],
        userValue: null,
        appHandObj: [],
        appValue: null,
        deckRemaining: null,
    }
}

const drewRound = state => {
    return {
        ...state,
        userHandObj: [],
        userValue: null,
        appHandObj: [],
        appValue: null,
    }
}

const handlCloseRecord = state => {
    console.log(state)
    return {
        ...state,
        isNewRecord: null
    }
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_NEW_GAME:
            return startGame(state, action);
        case actionTypes.ADD_A_CHIP_TO_BAT:
            return pushNewBat(state, action);
        case actionTypes.FIRST_DEAL_HAND:
            return hendleFirstDeal(state, action);
        case actionTypes.HIT_USER_NEW_CARD:
            return hitUser(state, action);
        case actionTypes.HIT_DEALER_NEW_CARD:
            return hitDealer(state, action);
        case actionTypes.USER_LOST_ROUND:
            return userLostRound(state);
        case actionTypes.USER_WON_ROUND:
            return userWinRound(state);
        case actionTypes.DREW_ROUND:
            return drewRound(state);
        case actionTypes.HANDLE_RECORD_MODAL:
            return handlCloseRecord(state);
        case actionTypes.MOVE_TO:
            return moveToStep(action);
        case actionTypes.ALL_IN:
            return pushAllChips(state);
        default:
            return state;
    }
}

export default combineReducers({
    mainReducer
})