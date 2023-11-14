import React, { useState } from 'react'
import Output from '../components/output'
import Form from './form'

function TermCalculator() {
  const [result, setResult] = useState(null)
  const [interestEarned, setInterestEarned] = useState(null)

  return (
    <div style={{  width: 400, flex: 1, textAlign: 'center' }}>
      <Form
        getResult={(value) => setResult(value)} 
        getInterestEarned={(value) => setInterestEarned(value)} 
      />
      {!!result && !!interestEarned
        ? <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Output 
            result={result}
            label="final balance: "
            prefix="$"
            isCurrencyFormat={true} />
          <Output 
            result={interestEarned}
            label="interest earned: "
            prefix="$"
            isCurrencyFormat={true} />
        </div>
      : null 
      }
    </div>
  )
}

export default TermCalculator