import { CompoundTypes } from './enums'

const convertToMonthsAndYears = (value) => {
    if (value / 12 < 1) {
        return value > 1 ? value + " months" : value + " month"
    }
    else {
        const years = Math.floor(value / 12)
        const yearString = years > 1 ? " years " : " year "
        const months = value % 12
        const monthString = months > 1 ? " months" : " month"
        return years + yearString + (months === 0 ? "" : months + monthString)
    }
}

const convertDeposit = (startDeposit) => {
    return parseFloat(startDeposit.toString().replace(',', ''))
}

const calculateResult = (            
    startDeposit,
    interestRate,
    investmentTerm,
    compound
) => {
    const deposit = convertDeposit(startDeposit)
    const rate = (interestRate / 100)
    var compoundRate = compound.rate
    if (compound.label === CompoundTypes.AT_MATURITY.label) {
        compoundRate = 1 / (investmentTerm / 12)
    }
    const result = deposit * 
        Math.pow(1 + (rate / compoundRate), compoundRate * (investmentTerm / 12))

    return parseFloat(Math.ceil(result))
}

const calculateInterestEarned = (startDeposit, result) => {
    const deposit = convertDeposit(startDeposit)
    return Math.abs(result - deposit)
}

const functions = {
    convertToMonthsAndYears,
    calculateResult,
    calculateInterestEarned
}

export default functions