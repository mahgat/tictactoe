import  {computeCaseSize,setInitialCases,isThereAWinner} from './util_cases'

export const changeConfig = (nbCases) => ({
    type:'CHANGE_CONFIG',
    payload:{
        nbCases,
        caseSize:computeCaseSize(nbCases),
        cases:setInitialCases(nbCases)
    }
})

export const resetGame=(nbCases, gameIdentifier) => {
    return {
        type:'RESET_GAME',
        payload: {
        nextPlayer:Math.random()>0.5?1:2,
        cases:setInitialCases(nbCases),
        winningCase:0,
        onGoingPlay:false,
        gameIdentifier:gameIdentifier+1
    }
}}

export const caseClick=(index,cases,nbCases,nextPlayer,winningCase)=> {
    const newCases = [...cases]
    if (winningCase===0) {
        newCases[index]=nextPlayer
    }
    return {
        type:"CASE_CLIC",
        payload: {
            index,
            cases:newCases,
            nextPlayer:nextPlayer===2?1:nextPlayer+1,
            winningCase:isThereAWinner(index,newCases,nbCases,nextPlayer),
            onGoingPlay:true
        }
}}
