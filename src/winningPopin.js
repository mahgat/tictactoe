import React from 'react'
import {connect} from 'react-redux'
import {getCaseCssClass} from './util_cases'
import {resetGame} from './actions'

function WinningPopin({winningCase, nbCases, gameIdentifier,resetGame}) {
    return (<div className="winnerContainer">
                <span style={{color:'blue'}}><h4>The winner is </h4></span>
                <div className={`case ${getCaseCssClass(winningCase)}`}></div>
                <button onClick={ (e) => {
                            resetGame(nbCases,gameIdentifier)
                            e.preventDefault()
                        }
                    }>Replay</button>
            </div>)
}

const mapStateToProps = (state) => ({
    winningCase:state.winningCase,
    nbCases:state.nbCases,
    gameIdentifier:state.nbCases
})

const mapDispatchToProps = (dispatch) => ({
    resetGame:(nbCases, gameIdentifier)=>dispatch(resetGame(nbCases, gameIdentifier))
})

export default 
    connect(mapStateToProps, mapDispatchToProps) (WinningPopin)
