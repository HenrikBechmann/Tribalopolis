// WorspaceToolbar.tsx
// copyright (c) 2023-present Henrik Bechmann, Toronto, Licence: GPL-3.0

import React, {CSSProperties} from 'react'

import {
  Box,
  Tooltip,
} from '@chakra-ui/react'

import VerticalToolbarDivider from '../components/VerticalToolbarDivider'

import cartIcon from '../../assets/cart.png'
import workspacesIcon from '../../assets/workspaces.png'
import panelIcon from '../../assets/panel.png'
import helpIcon from '../../assets/help.png'
import uploadIcon from '../../assets/upload.png'

const standardToolbarStyles = {
    minHeight:0,
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    whitespace:'nowrap',
    alignItems:'center',
    height:'46px',
    boxSizing:'border-box',
    backgroundColor:'#dfecdf', //'#f2f2f2',

} as CSSProperties

const iconWrapperStyles = {
    display:'inline-block',
    marginLeft:'12px',
    opacity:0.7,
}

const iconStyles = {
    height:'20px',
    width:'20px',
}

const panelIconStyles = {
    height:'20px',
    width:'20px',
    transform:'rotate(-90deg)'
}

const smallerIconStyles = {
    height:'18px', 
    width:'18px'
}

const upArrowWrapperStyles = {
    display:'flex',
    transform:'rotate(180deg)'

}

const arrowStyles = {
    opacity:0.5, 
    fontSize:'small',
    alignItems:'center',
}

const displayNameStyles = {
    display:'flex',
    flexWrap:'nowrap',
    alignItems:'center',
    whiteSpace:'nowrap',
    fontSize:'small', 
    marginLeft:'4px',
    marginRight:'3px', 
} as CSSProperties

const SelectionControl = (props) => {

    const 
        { displayName, icon, iconStyles, tooltipLabel } = props

    return <Box style = {{
        display:'flex',
        flexWrap:'nowrap',
        marginLeft:'4px',
        borderRadius:'6px',
        alignItems: 'center',
        }}
    >
        
        <Tooltip hasArrow label = {tooltipLabel} >
        <Box style = {iconWrapperStyles}> <img style = {iconStyles} src = {icon} /></Box>
        </Tooltip>
        <Box style = {displayNameStyles} >{displayName}</Box>
        <Box style = {upArrowWrapperStyles} ><span style = {arrowStyles}>▼</span></Box>
    </Box>

}

const WorkspaceToolbar = (props) => {

    return <Box style = {standardToolbarStyles}>
        <Box style = {iconWrapperStyles} >
            <Tooltip hasArrow label = 'toggle the item transfer cart'>
                <img style = {iconStyles} src = {cartIcon} />
            </Tooltip>
        </Box> 
        <VerticalToolbarDivider />
        <SelectionControl icon = {panelIcon} iconStyles = {panelIconStyles} displayName = 'panel selection' tooltipLabel = 'select a panel'/>
        <SelectionControl icon = {workspacesIcon} iconStyles = {iconStyles} displayName = 'workspace selection' tooltipLabel = 'select a workspace'/>
        <Box style = {iconWrapperStyles} >
            <Tooltip hasArrow label = 'Explain this toolbar'>
                <img style = {smallerIconStyles} src = {helpIcon} />
            </Tooltip>
        </Box>
        <VerticalToolbarDivider />
        <Box style = {iconWrapperStyles} >
            <Tooltip hasArrow label = 'toggle the item transfer cart'>
                <img style = {iconStyles} src = {uploadIcon} />
            </Tooltip>
        </Box> 
        &nbsp; &nbsp;
    </Box>
}

export default WorkspaceToolbar

