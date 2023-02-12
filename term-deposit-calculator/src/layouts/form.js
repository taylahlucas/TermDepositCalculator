import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, InputAdornment } from '@mui/material'
import { NumericFormat } from 'react-number-format';
import CustomSlider from '../components/slider'
import Dropdown from '../components/dropdown'
import { CompoundTypes } from '../utils/enums'
import CalculatorFunctions from '../utils/calculatorFunctions'
import { inputStyles } from '../styles';

const propTypes = {
    getResult: PropTypes.func.isRequired,
    getInterestEarned: PropTypes.func.isRequired
}

// The Form component handles all calculations and input components 
// & will pass the result back to TermCalculator.
const Form = (props) => {
    const [startDeposit, setStartDeposit] = useState(10000)
    const [interestRate, setInterestRate] = useState(1.10)
    const [investmentTerm, setInvestmentTerm] = useState(36)
    const [compound, setCompound] = useState(CompoundTypes.MONTHLY)

    const [validDeposit, setValidDeposit] = useState(true)
    const [validRate, setValidRate] = useState(true)
    const [validTerm, setValidTerm] = useState(true)


    return (
        <div>
            <NumericFormat 
                customInput={TextField} 
                style={inputStyles}
                label="start deposit" 
                error={!validDeposit}
                helperText={validDeposit ? null : "Please enter a value between $10 and $1,000,000"}
                inputProps={{ maxLength: 9 }}
                InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
                thousandSeparator={true}
                onChange={(event) => {
                    const deposit = event.target.value.replaceAll(',', '')
                    setStartDeposit(event.target.value)
                    setValidDeposit(deposit >= 10 && deposit <= 1000000)
                }}
                value={startDeposit}
            />
            <TextField 
                type='number'
                style={inputStyles}
                label="interest rate" 
                error={!validRate}
                helperText={validRate ? null : "Please enter a percentage between 0% - 5%"}
                inputProps={{ maxLength: 5 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>% p.a</InputAdornment>
                }}
                onChange={(event) => {
                    setInterestRate(event.target.value)
                    setValidRate(event.target.value >= 0.01 && event.target.value <= 5.0)
                }}
                value={interestRate}
            />
            <CustomSlider 
                inputStyles={{ width: 250, marginTop: '30px' }}
                value={investmentTerm} 
                isValid={validTerm} 
                onChange={(event) => {
                    setInvestmentTerm(event.target.value)
                    setValidTerm(event.target.value > 0 && event.target.value <= 60)
                }} 
            />
            <Dropdown 
                inputStyles={{ marginTop: '30px' }}
                options={Object.values(CompoundTypes)}
                value={compound}
                onChange={(event) => setCompound(event.target.value)}
            />
            <Button 
                variant='outlined'
                style={inputStyles}
                disabled={!validDeposit || !validRate || !validTerm}
                onClick={() => {
                    const result = CalculatorFunctions.calculateResult(
                        startDeposit,
                        interestRate,
                        investmentTerm,
                        compound
                    )
                    const interestEarned = CalculatorFunctions.calculateInterestEarned(startDeposit, result)
                    props.getResult(result)
                    props.getInterestEarned(interestEarned)
                }}>Calculate result</Button>
        </div>
    )
}

Form.propTypes = propTypes

export default Form