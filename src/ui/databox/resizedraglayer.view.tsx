// resizedraglayer.view.tsx

// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later

'use strict'

import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { DragLayer } from 'react-dnd'

const styles = createStyles({
    frame:{
        border:'5px solid silver',
        position:'absolute',
        top:-6,
        borderRadius:12,
    },
})

class ResizeDragLayer extends React.Component<any,any> {

    constructor(props) {
        super(props)
        this.previewElement = React.createRef()
    }

    state = {
        width:this.props.offsetWidth,
        left:-6,
    }

    previewElement

    startingwidth = this.props.offsetWidth
    startingleft = -6

    lastoffset = 0

    render() {
        const { classes } = this.props

        if (this.previewElement.current) {

            let diff = this.props.currentDifference.x
            if (Math.abs(this.lastoffset - diff) > 1) { // optimization
                this.lastoffset = diff

                let widthnumber = this.startingwidth + (diff * 2)

                if (widthnumber < 200) {
                    widthnumber = 200
                    diff = (200 - this.startingwidth) / 2
                }
                else if (widthnumber > 600) {
                    widthnumber = 600
                    diff = (600 - this.startingwidth) / 2
                }

                let width = (widthnumber) + 'px'
                let left = (this.startingleft - diff) + 'px'

                this.previewElement.current.style.width = width
                this.previewElement.current.style.left = left

            }
        }

        const framestyles:React.CSSProperties = {
            height:this.props.offsetHeight,
            zIndex:100,
        }

        return (
        <div 
            ref = { this.previewElement }
            className = { classes.frame } 
            style = { framestyles }
        >
            <div 
                className = { this.props.resizeTabStyles.tabstyles } 
                style = {{ backgroundColor:'silver',opacity:1 }}
            >
                <div className = { this.props.resizeTabStyles.iconwrapperstyles } >
                    <Icon className = { this.props.resizeTabStyles.iconstyles } > drag_handle </Icon>
                </div> 

            </div>

        </div>
        )
    }

}

export default withStyles(styles)(
    DragLayer(monitor => ({
        currentDifference: monitor.getDifferenceFromInitialOffset(),
    })
)(ResizeDragLayer))