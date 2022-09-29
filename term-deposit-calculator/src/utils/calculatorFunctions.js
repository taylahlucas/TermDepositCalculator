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

const calculateResult = (            
    startDeposit,
    interestRate,
    investmentTerm,
    compound
) => {
    const rate = (interestRate / 100)
    console.log("startDeposit: ", startDeposit)
    console.log("interestRate: ", interestRate)
    console.log("investmentTerm: ", investmentTerm)
    console.log("compound: ", compound)
    const result = startDeposit * 
        Math.pow((rate / compound.rate), compound.rate * (investmentTerm / 12))
    
    console.log("HERE: ", result.toFixed(2))
    return parseFloat(result.toFixed(2))
}

const functions = {
    convertToMonthsAndYears,
    calculateResult
}

export default functions