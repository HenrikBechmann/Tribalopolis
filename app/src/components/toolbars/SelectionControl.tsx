// SelectionControl.tsx
// copyright (c) 2024-present Henrik Bechmann, Toronto, Licence: GPL-3.0

import React, {CSSProperties} from 'react'

import {
  Tooltip, Box,
} from '@chakra-ui/react'

const iconWrapperStyles = {
    display:'inline-block',
    // marginLeft:'12px',
    opacity:0.7,
}

const displayNameStyles = {
    display:'flex',
    flexWrap:'nowrap',
    alignItems:'center',
    whiteSpace:'nowrap',
    fontSize:'small', 
    marginLeft:'6px',
    marginRight:'3px', 
} as CSSProperties

const upArrowWrapperStyles = {
    display:'flex',
    transform:'rotate(180deg)'

}

const arrowStyles = {
    opacity:0.5, 
    fontSize:'small',
    alignItems:'center',
}

const SelectionControl = (props) => {

    const 
        { displayName, icon, iconStyles, tooltip, caption } = props

    return <Box style = {{
        display:'flex',
        flexDirection:'column',
        flexWrap:'nowrap',
        marginLeft:'6px',
        borderRadius:'6px',
        alignItems: 'center',
        justifyContent: 'center',
        }}
    >
        
        <Box display = 'flex' flexDirection = 'row' alignItems = 'center'>
            <Tooltip hasArrow label = {tooltip} >
                <Box style = {iconWrapperStyles}> <img style = {iconStyles} src = {icon} /></Box>
            </Tooltip>
            <Box style = {displayNameStyles} >{displayName}</Box>
            <Box style = {upArrowWrapperStyles} ><span style = {arrowStyles}>▼</span></Box>
        </Box>
        <Box fontSize = 'xs' fontStyle = 'italic'><span>{caption}</span></Box>
    </Box>

}

export default SelectionControl