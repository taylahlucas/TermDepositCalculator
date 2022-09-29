import React, { useState } from 'react'
import Output from '../components/output'
import Form from './form'

function TermCalculator() {
  const [result, setResult] = useState(null)

  const getResult = (value) => {
    setResult(value)
  }

  return (
      <div style={{  width: 400, flex: 1, textAlign: 'center' }}>
          <Form getResult={getResult} />
          {result != null 
              ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Output 
                        result={result}
                        prefix={"result: $"}
                        isCurrencyFormat={true} />
                </div>
              : null 
            }
      </div>
  )
}

export default TermCalculator