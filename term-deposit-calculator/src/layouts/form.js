import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, InputAdornment } from '@mui/material'
import { NumericFormat } from 'react-number-format';
import CustomSlider from '../components/slider'
import Dropdown from '../components/dropdown'
import { CompoundTypes } from '../utils/enums'
import CalculatorFunctions from '../utils/calculatorFunctions'

const inputStyles = {
    width: 300,
    height: 50,
    marginTop: 40,
    marginBottom: 40
}

const propTypes = {
    getResult: PropTypes.func.isRequired
}

const Form = (props) => {
    const [startDeposit, setStartDeposit] = useState(10000)
    const [interestRate, setInterestRate] = useState(0.01)
    const [investmentTerm, setInvestmentTerm] = useState(1)
    const [compound, setCompound] = useState(CompoundTypes.MONTHLY)

    const [validDeposit, setValidDeposit] = useState(true)
    const [validRate, setValidRate] = useState(true)
    const [validTerm, setValidTerm] = useState(true)

    const handleDeposit = (event) => {
        const deposit = event.target.value.replace(',', '')
        setStartDeposit(deposit)
        setValidDeposit(deposit > 0 && deposit <= 500000000)
    }

    const handleRate = (event) => {
        setInterestRate(event.target.value)
        setValidRate(event.target.value >= 0.01 && event.target.value <= 15.0)
    }

    const handleTerm = (event) => {
        setInvestmentTerm(event.target.value)
        setValidTerm(event.target.value > 0 && event.target.value <= 60)
    }

    const handleCompound = (value) => {
        setCompound(value)
    }

    const getResult = () => {
        const result = CalculatorFunctions.calculateResult(
            startDeposit,
            interestRate,
            investmentTerm,
            compound
         )
         props.getResult(result)
    }

    return (
        <div>
            <NumericFormat 
                customInput={TextField} 
                style={inputStyles}
                label="start deposit" 
                error={!validDeposit}
                helperText={validDeposit ? null : "Please enter a value between $10 and $500,000,000"}
                InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
                thousandSeparator={true}
                onChange={(event) => handleDeposit(event)}
                value={startDeposit}
            />
            <TextField 
                type='number'
                style={inputStyles}
                label="interest rate" 
                error={!validRate}
                helperText={validRate ? "" : "Please enter a percentage between 0% - 15%"}
                InputLabelProps={{
                    shrink: true
                }}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>% p.a</InputAdornment>
                }}
                onChange={(event) => handleRate(event)}
                value={interestRate}
            />
            <CustomSlider 
                inputStyles={{ width: 250, marginTop: '30px' }}
                value={investmentTerm} 
                isValid={validTerm} 
                onChange={(event) => handleTerm(event)} 
            />
            <Dropdown 
                inputStyles={{ marginTop: '30px' }}
                options={Object.values(CompoundTypes)}
                value={compound}
                onChange={(event) => handleCompound(event)}
            />
            <Button 
                variant='outlined'
                style={inputStyles}
                disabled={!validDeposit || !validRate || !validTerm}
                onClick={() => getResult()}>Calculate result</Button>
        </div>
    )
}

Form.propTypes = propTypes

export default Form