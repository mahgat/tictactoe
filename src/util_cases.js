export const computeCaseSize= (nbCases)=> {
    const WIDTH = 500
    return Math.floor(0.95*WIDTH/nbCases)
}

export const setInitialCases=(initialNbCases)=> {
    const initialCases = []
    for (let i=0;i<initialNbCases*initialNbCases;i++) {
        initialCases.push(0)
    }
    return initialCases
}

export const isThereAWinner = function(index, cases, nbCases, nextPlayer) {
    // console.log(`isThereAWinner(${index} ${cases} ${nbCases} ${nextPlayer})`)
    const i = nbCases*Math.floor(index/nbCases)
    const j = nbCases*(Math.floor(index/nbCases)+1)
    let row = cases.slice(i, j)
    let isWinner = row.reduce((prev,c)=>prev&&c===nextPlayer,true)

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
    
    isWinner = column.reduce((prev,c)=>prev&&cases[c]===nextPlayer,true)
    if (isWinner)
      return nextPlayer

    const leftToBottomnDiagonal = []
    for (let l=0;l<nbCases*nbCases;l+=nbCases+1) {
      leftToBottomnDiagonal.push(l)
    }
    isWinner=leftToBottomnDiagonal.indexOf(index)>-1 
            && leftToBottomnDiagonal.reduce((prev,c)=>prev&&cases[c]===nextPlayer,true)
    // console.log(leftToBottomnDiagonal)
    if (isWinner)
      return nextPlayer

    const topToRightDiagonal = []
    for (let l=nbCases-1;l<nbCases*(nbCases-1)+1;l+=nbCases-1) {
      topToRightDiagonal.push(l)
    }
    // console.log(topToRightDiagonal)
    isWinner=topToRightDiagonal.indexOf(index)>-1 
            && topToRightDiagonal.reduce((prev,c)=>prev&&cases[c]===nextPlayer,true)
    if (isWinner)
      return nextPlayer

    return 0
  } 


  export const getCaseCssClass = (c)=>
  {
    return c===1?"circle":c===2?"square":"empty";
  }