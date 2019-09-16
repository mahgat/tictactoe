import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {caseClick} from './actions'
import {getCaseCssClass} from './util_cases'

class Case extends React.Component {
    static propTypes = {
        index:PropTypes.number.isRequired,
        cases:PropTypes.array.isRequired,
        caseSize:PropTypes.number.isRequired,
        onCaseClick:PropTypes.func.isRequired
    }
    static defaultProps = {
        caseSize:100,
    }

    render() {
        const {index,cases,caseSize,onCaseClick,nbCases,nextPlayer,winningCase} = this.props
        return <div className={`case ${getCaseCssClass(cases[index])}`}
                    onClick = {()=>{
                                        if (cases[index]===0) {
                                            onCaseClick(index,cases,nbCases,nextPlayer,winningCase)
                                        }
                                    }}
                    style= {{width:`${caseSize}px`, height:`${caseSize}px`}}
                     >
                </div>
    }
}

const mapStateToProps = (state,ownProps) => (
    {
        index:ownProps.index,
        cases:state.cases,
        caseSize:state.caseSize,
        nbCases:state.nbCases,
        nextPlayer:state.nextPlayer,
        winningCase:state.winningCase
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        onCaseClick: (index,cases,nbCases,nextPlayer,winningCase) =>
         dispatch(caseClick(index,cases,nbCases,nextPlayer,winningCase))
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Case);