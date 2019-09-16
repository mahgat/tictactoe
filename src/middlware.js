import {isThereAWinner} from './util_cases'

//a middlware that checks if there is a winner
export const checkForWinnerMiddleware = store=>next=>action => {
    if (action.type==='CASE_CLIC') {
        const {index,cases}= action.payload
        const {nbCases,nextPlayer} = store.getState()
        console.log(`${index} ${cases} ${nbCases} ${nextPlayer}`)
        const winnerResult = isThereAWinner(index,cases,nbCases, nextPlayer)
        console.log(`checkForWinnerMiddleware : direct check for winner => ${winnerResult}`)
        const ret = next(action)
        console.log(`checkForWinnerMiddleware : from the store after call to dispatch => ${store.getState().winningCase}`)
        console.log(ret)
        return ret
    }
}