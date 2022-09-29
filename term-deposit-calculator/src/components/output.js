import React from 'react'
import PropTypes from 'prop-types'
import { NumericFormat } from 'react-number-format'

const propTypes = {
    result: PropTypes.number,
    label: PropTypes.string,
    prefix: PropTypes.string,
    isCurrencyFormat: PropTypes.bool
}

const Output = (props) => {
    return (
        <div style={{ width: 400, height: 100, fontFamily: 'Helvetica' }}>
            <div>{props.label}</div>
            <NumericFormat 
                displayType='text'
                prefix={props.prefix}
                thousandSeparator={props.isCurrencyFormat}
                value={props.result}
            />
        </div>
    )
}

Output.propTypes = propTypes

export default Output