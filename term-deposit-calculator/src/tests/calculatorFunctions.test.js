import '@testing-library/jest-dom'
import CalculatorFunctions from '../utils/calculatorFunctions'
import { CompoundTypes } from '../utils/enums'

describe('convertMonthsToYears', () => {
    test('correctly converts 1 month', () => {
        expect(CalculatorFunctions.convertToMonthsAndYears(1)).toBe("1 month")
    })

    test('correctly converts values less than 1 year', () => {
        expect(CalculatorFunctions.convertToMonthsAndYears(9)).toBe("9 months")
    })

    test('correctly converts values greater than 1 year', () => {
        expect(CalculatorFunctions.convertToMonthsAndYears(12)).toBe("1 year ")
        expect(CalculatorFunctions.convertToMonthsAndYears(14)).toBe("1 year 2 months")
        expect(CalculatorFunctions.convertToMonthsAndYears(36)).toBe("3 years ")
        expect(CalculatorFunctions.convertToMonthsAndYears(37)).toBe("3 years 1 month")
    })
})

describe('calculateResult', () => {
    test('calculates the correct term deposit', () => {
        expect(CalculatorFunctions.calculateResult(3300, 1.10, 17, CompoundTypes.MONTHLY)).toBe(3352)
        expect(CalculatorFunctions.calculateResult(17700, 2.40, 26, CompoundTypes.QUARTERLY)).toBe(18642)
        expect(CalculatorFunctions.calculateResult(28100, 3.00, 42, CompoundTypes.ANNUALLY)).toBe(31163)
        expect(CalculatorFunctions.calculateResult('610,000', 5.00, 55, CompoundTypes.AT_MATURITY)).toBe(749792)
    })
})

describe('calculateInterestEarned', () => {
    test('calculates the correct interest earned', () => {
        expect(CalculatorFunctions.calculateInterestEarned(18300, 22494)).toBe(4194)
        expect(CalculatorFunctions.calculateInterestEarned(11200, 13767)).toBe(2567)
        expect(CalculatorFunctions.calculateInterestEarned('310,000', 381042)).toBe(71042)
    })
})