import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@mui/material/Slider'
import CalculatorFunctions from '../utils/calculatorFunctions'

const propTypes = {
    inputStyles: PropTypes.object,
    value: PropTypes.number.isRequired,
    isValid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

const CustomSlider = (props) => {
    return(
        <div>
            <Slider 
                style={props.inputStyles}
                size='small'
                min={1}
                max={60}
                valueLabelDisplay='auto'
                onChange={(event) => props.onChange(event)}
                value={props.value}
            />
            <div style={{ fontFamily: 'Helvetica' }}>{CalculatorFunctions.convertToMonthsAndYears(props.value)}</div>
        </div>
    )
}

CustomSlider.propTypes = propTypes

export default CustomSlider