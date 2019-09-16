//import {Component, React} from 'react';
import React from 'react';
import PropTypes from 'prop-types'
import Case from './case.js'
import WinningPopin from './winningPopin'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    const {maxNbCases} = this.props
    
    const nbCases = 3
    const initialCases = []
    for (let i=0;i<nbCases*nbCases;i++) {
      initialCases.push(0)
    }

    const availableConfigs = []
    for (let i=3;i<maxNbCases;i++) {
      availableConfigs.push(i)
    }

    
    this.state = {
      availableConfigs,
      nbCases,
      caseSize:this.computeCaseSize(nbCases),
      nextPlayer:Math.random()>0.5?1:2,
      cases:initialCases,
      winningCase:0,
      onGoingPlay:false,
      playNumber:0 //will be included in the playing map key. So that a new playNumber will erase the map
    }

    this.onSelectConfigChange=this.onSelectConfigChange.bind(this)
    this.replayFunction=this.replayFunction.bind(this)
  }

  static propTypes = {
    maxNbCases:PropTypes.number.isRequired
  }
  static defaultProps = {
     maxNbCases:13
  }
  
  computeCaseSize(nbCases) {
    const WIDTH = 500
    return Math.floor(0.95*WIDTH/nbCases)
  }

  getCaseCssClass (c) {
    return c==1?"circle":c==2?"square":"empty";
  }

  onCaseClick = (index) => () => {
                                    const {cases,nextPlayer,winningCase} = this.state
                                    if (winningCase==0) {
                                      cases[index]=nextPlayer
                                      this.setState ({cases,nextPlayer:nextPlayer==2?1:nextPlayer+1,
                                                      winningCase:this.isThereAWinner(index,nextPlayer),
                                                    onGoingPlay:true})
                                      
                                      return nextPlayer
                                    }
                                  }

  isThereAWinner = function(index,nextPlayer) {
    const {nbCases,cases}=this.state;
    const i = nbCases*Math.floor(index/nbCases)
    const j = nbCases*(Math.floor(index/nbCases)+1)
    let row = cases.slice(i, j)
    let isWinner = row.reduce((prev,c)=>prev&&c==nextPlayer,true)

    if (isWinner)
      return nextPlayer
    
    let column=[]
    let k = index-nbCases;
    
    while(k>=0) {
      column.push(k)
      k-=nbCases
    }
    column.push(index)

    k=index+nbCases;
    while(k<nbCases*nbCases) {
      column.push(k)
      k+=nbCases
    }
    
    isWinner = column.reduce((prev,c)=>prev&&cases[c]==nextPlayer,true)
    if (isWinner)
      return nextPlayer

    const leftToBottomnDiagonal = []
    for (let l=0;l<nbCases*nbCases;l+=nbCases+1) {
      leftToBottomnDiagonal.push(l)
    }
    isWinner=leftToBottomnDiagonal.indexOf(index)>-1 
            && leftToBottomnDiagonal.reduce((prev,c)=>prev&&cases[c]==nextPlayer,true)
    console.log(leftToBottomnDiagonal)
    if (isWinner)
      return nextPlayer

    const topToRightDiagonal = []
    for (let l=nbCases-1;l<nbCases*(nbCases-1)+1;l+=nbCases-1) {
      topToRightDiagonal.push(l)
    }
    console.log(topToRightDiagonal)
    isWinner=topToRightDiagonal.indexOf(index)>-1 
            && topToRightDiagonal.reduce((prev,c)=>prev&&cases[c]==nextPlayer,true)
    if (isWinner)
      return nextPlayer

    return 0
  }

  onSelectConfigChange(event) {
    const newNbCases = Number(event.target.value)
    const initialCases = []
    for (let i=0;i<newNbCases*newNbCases;i++) {
      initialCases.push(0)
    }
    this.setState({nbCases:newNbCases,
       caseSize:this.computeCaseSize(newNbCases),
       cases:initialCases})
  }

  replayFunction(event) {
    const {nbCases,cases,playNumber}=this.state
    cases.forEach((_,i)=>{cases[i]=0})
    const newPlayNumber=playNumber+1
    this.setState ({
      nextPlayer:Math.random()>0.5?1:2,
      cases,
      winningCase:0,
      onGoingPlay:false,
      playNumber:newPlayNumber
    })
    event.preventDefault()
  }

  render() {
    const {nbCases, caseSize, nextPlayer, cases, winningCase,availableConfigs,onGoingPlay,
    playNumber} = this.state

    return (
      <React.Fragment>
        <h1>Tic Tac Toe with <span style={{color:'blue'}}>{`${nbCases}x${nbCases}`}</span> cases </h1>
        <form>          
          <div className="selectNbCases" >
            <span>Select number of cases : </span>
            <select value={nbCases} onChange={this.onSelectConfigChange} disabled={onGoingPlay}>
              {availableConfigs.map(n=><option value={n}>{`${n} x ${n} cases`}</option>)}
            </select>
            <button onClick={this.replayFunction}>Reset game</button>
          </div>
        </form>
        <div class="container">
          <div style={{width:'60px;'}}>
            Next player
            <div class={`case ${this.getCaseCssClass(nextPlayer)}`} style={{width:'100px',height:'100px'}}></div>
          </div>
        <div class="map" key={`map_nbCases${nbCases}_play${playNumber}`}>
          {
            cases.map(
              (c,i)=> 
                  <Case key={`key_${i}`}
                       initial={c} 
                       caseSize={caseSize}
                       getCaseCssClass={this.getCaseCssClass}
                       onCaseClick={this.onCaseClick(i)}
                  >
                  </Case>
              )
          }
        </div>
          {winningCase>0?<WinningPopin winningCase={winningCase} 
                          getCaseCssClass={this.getCaseCssClass}
                          replayFunction={this.replayFunction}/>
                      :null}
        
        </div>
        
      </React.Fragment>
    )
  }
}

export default App;
