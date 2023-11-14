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
    const [formData, setFormData] = useState({
        startDeposit: 10000,
        interestRate: 1.10,
        investmentTerm: 36,
        compound: CompoundTypes.MONTHLY,
        validDeposit: true,
        validRate: true,
        validTerm: true
    })

    return (
        <div>
            <NumericFormat 
                customInput={TextField} 
                style={inputStyles}
                label="start deposit" 
                error={!formData.validDeposit}
                helperText={formData.validDeposit ? null : "Please enter a value between $10 and $1,000,000"}
                inputProps={{ maxLength: 9 }}
                InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
                thousandSeparator={true}
                onChange={(event) => {
                    const deposit = event.target.value.replaceAll(',', '')
                    setFormData({
                        ...formData,
                        startDeposit: event.target.value,
                        validDeposit: deposit >= 10 && deposit <= 1000000
                    })
                }}
                value={formData.startDeposit}
            />
            <TextField 
                type='number'
                style={inputStyles}
                label="interest rate" 
                error={!formData.validRate}
                helperText={formData.validRate ? null : "Please enter a percentage between 0% - 5%"}
                inputProps={{ maxLength: 5 }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>% p.a</InputAdornment>
                }}
                onChange={(event) => setFormData({
                    ...formData,
                    interestRate: event.target.value,
                    validRate: event.target.value >= 0.01 && event.target.value <= 5.0
                })}
                value={formData.interestRate}
            />
            <CustomSlider 
                inputStyles={{ width: 250, marginTop: '30px' }}
                value={formData.investmentTerm} 
                isValid={formData.validTerm} 
                onChange={(event) => setFormData({
                    ...formData,
                    investmentTerm: event.target.value,
                    validTerm: event.target.value > 0 && event.target.value <= 60
                })} 
            />
            <Dropdown 
                inputStyles={{ marginTop: '30px' }}
                options={Object.values(CompoundTypes)}
                value={formData.compound}
                onChange={(event) => setFormData({
                    ...formData,
                    compound: event
                })}
            />
            <Button 
                variant='outlined'
                style={inputStyles}
                disabled={!formData.validDeposit || !formData.validRate || !formData.validTerm}
                onClick={() => {
                    const result = CalculatorFunctions.calculateResult(
                        formData.startDeposit,
                        formData.interestRate,
                        formData.investmentTerm,
                        formData.compound
                    )
                    const interestEarned = CalculatorFunctions.calculateInterestEarned(formData.startDeposit, result)
                    props.getResult(result)
                    props.getInterestEarned(interestEarned)
                }}>Calculate result</Button>
        </div>
    )
}

Form.propTypes = propTypes

export default Form