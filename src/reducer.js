import {computeCaseSize, setInitialCases} from './util_cases'

const initialNbCases = 3
const maxNbCases = 13

const availableConfigs = []
for (let i=3;i<maxNbCases;i++) {
    availableConfigs.push(i)
}

export const initialState = {
    maxNbCases,
    nbCases:initialNbCases,
    caseSize:computeCaseSize(initialNbCases),
    availableConfigs,
    cases:setInitialCases(initialNbCases),
    nextPlayer:Math.random()>0.5?1:2,
    winningCase:0,
    onGoingPlay:false,
    playNumber:0//will be included in the playing map key. So that a new playNumber will erase the map
}

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'CHANGE_CONFIG':
            return {...state,
                nbCases:action.payload.nbCases,
                caseSize:action.payload.caseSize,
                cases:action.payload.cases
            }
        case 'RESET_GAME':
            return {...state,
                nextPlayer: action.payload.nextPlayer,
                cases: action.payload.cases,
                winningCase: action.payload.winningCase,
                onGoingPlay: action.payload.onGoingPlay,
                gameIdentifier: action.payload.gameIdentifier
            }
        case 'CASE_CLIC':
            return {...state,
                cases:action.payload.cases,
                nextPlayer:action.payload.nextPlayer,
                winningCase:action.payload.winningCase,
                onGoingPlay:action.payload.onGoingPlay
            }
        default : return state
    }
}