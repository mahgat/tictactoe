//import {Component, React} from 'react';
import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeConfig,resetGame} from './actions'
import Case from './case.js'
import WinningPopin from './winningPopin'
import {getCaseCssClass} from './util_cases'
import './App.css';

class App extends React.Component {
  static propTypes = {
    maxNbCases:PropTypes.number.isRequired,
    nbCases:PropTypes.number.isRequired,
    //TODO: remaining props, also give them default values
    onSelectConfigChange:PropTypes.func.isRequired,
    resetGame:PropTypes.func.isRequired
  }
  static defaultProps = {
     maxNbCases:13,
     nbCases:3,
  }


  render() {
    const {nbCases, cases, nextPlayer, winningCase,availableConfigs,onGoingPlay,
    gameIdentifier, onSelectConfigChange,resetGame} = this.props

    return (
      <React.Fragment>
        <h1>Tic Tac Toe with <span style={{color:'blue'}}>{`${nbCases}x${nbCases}`}</span> cases </h1>
        <form>
          <div className="selectNbCases" >
            <span>Select number of cases : </span>
            <select value={nbCases} onChange={
                                                (e)=>onSelectConfigChange(Number(e.target.value))
                                              } disabled={onGoingPlay}>
              {availableConfigs.map(n=><option key={n}
                                               value={n}>
                                          {`${n} x ${n} cases`}
                                        </option>)}
            </select>
            <button onClick={(e)=>{resetGame(nbCases,gameIdentifier);
                                   e.preventDefault();
                                  }}>Reset game</button>
          </div>
        </form>
        <div className="container">
          <div style={{width:'60px'}}>
            Next player
            <div className={`case ${getCaseCssClass(nextPlayer)}`} style={{width:'100px',height:'100px'}}></div>
          </div>
        <div className="map" key={`map_nbCases${nbCases}_play${gameIdentifier}`}>
          {
            cases.map(
              (c,i)=> 
                  <Case key={`key_${i}`}
                       index={i}
                  >
                  </Case>
              )
          }
        </div>
          {winningCase>0?<WinningPopin />
                      :null}
        
        </div>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
    nbCases:state.nbCases,
    nextPlayer:state.nextPlayer,
    caseSize:state.caseSize,
    cases:state.cases,
    winningCase:state.winningCase,
    availableConfigs:state.availableConfigs,
    onGoingPlay:state.onGoingPlay,
    gameIdentifier:state.gameIdentifier
  })

const mapDispatchToProps = (dispatch) => ({
  onSelectConfigChange:(nbCases)=>dispatch(changeConfig(nbCases)),
  resetGame:(nbCases,gameIdentifier)=>dispatch(resetGame(nbCases,gameIdentifier))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
