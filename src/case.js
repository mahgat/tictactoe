import React from 'react'
import PropTypes from 'prop-types'

class Case extends React.Component {    
    constructor(props){
        super(props)
        const {initial, caseSize,getCaseCssClass,onCaseClick} = props

        this.state = {current:initial,caseSize,getCaseCssClass,onCaseClick}
    }
    static propTypes = {
        initial:PropTypes.number.isRequired,
        caseSize:PropTypes.number.isRequired,
        getCaseCssClass:PropTypes.func.isRequired,
        onCaseClick:PropTypes.func.isRequired
    }
    static defaultProps = {
        initial:0,
        caseSize:100,
    }

    render() {
        const {current,caseSize,getCaseCssClass,onCaseClick} = this.state
        return <div className={`case ${getCaseCssClass(current)}`}
                    onClick = {()=>{
                                        if (current==0) {
                                            this.setState({current:onCaseClick()})
                                        }                                       
                                    }}
                    style= {{width:`${caseSize}px`, height:`${caseSize}px`}}
                     >
                </div>
    }
}

export default Case;