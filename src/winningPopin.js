import React from 'react'

function WinningPopin({winningCase, getCaseCssClass,replayFunction}) {
    return (<div className="winnerContainer">
                <span style={{color:'blue'}}><h4>The winner is </h4></span>
                <div className={`case ${getCaseCssClass(winningCase)}`}></div>
                <button onClick={replayFunction}>Replay</button>
            </div>)
}

export default WinningPopin;
