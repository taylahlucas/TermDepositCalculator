import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Select, FormControl } from '@mui/material'

const propTypes = {
    inputStyles: PropTypes.object,
    options: PropTypes.arrayOf(
        PropTypes.shape({ 
            value: PropTypes.number,
            label: PropTypes.string,
            rate: PropTypes.number 
        })
    ).isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

const Dropdown = (props) => {
    return (
        <div style={props.inputStyles}>
            <FormControl>
                <Select 
                    value={props.value.value}
                    onChange={(event) => {
                        props.onChange(props.options.find(item => item.value === event.target.value))
                    }}>
                {props.options.map((item) => 
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                )}
                </Select>
            </FormControl>
        </div>
    )
}

Dropdown.propTypes = propTypes

export default Dropdown