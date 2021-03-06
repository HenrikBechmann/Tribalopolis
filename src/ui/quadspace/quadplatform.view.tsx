// quadplatform.view.tsx
// copyright (c) 2019 Henrik Bechmann, Toronto, Licence: GPL-3.0-or-later
'use strict'

import React from 'react'

import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = createStyles({
    root: {
        position:'absolute',
        transition: 'top .5s ease,left .5s ease, width .5s ease, height .5s ease',
    }
})

class QuadPlatform extends React.Component<any,any> {

    constructor(props) {
        super(props)
        this.calculateDimensions(this.state.split)
        this.calculatePosition(this.state.currentQuadPosition)
        this.element = React.createRef()
    }

    state = {
        currentQuadPosition: this.props.currentQuadPosition,
        split:this.props.split,
    }

    positions = null

    dimensions = null

    element = null

    changeCurrentQuad = nextProps => {
        let element = this.element.current
        // set top left for animation

        let nextquadposition = nextProps.currentQuadPosition

        this.calculateTransitionPosition(this.state.currentQuadPosition)

        this.forceUpdate(() =>{

            setTimeout(()=> {

                // prepare for animation transition
                this.calculateTransitionPosition(nextquadposition)

                this.setState({

                    currentQuadPosition:nextquadposition,

                },() => { // restore settings to be able to respond to user resize of window

                    setTimeout(()=> {

                        this.calculatePosition(nextquadposition)

                        this.setState({
                            currentQuadPosition:nextquadposition,
                        })

                    },600)

                })
            },50)
        })
    }

    updatingsplit = false

    componentDidUpdate() {

        if ((this.props.split != this.state.split) && !this.updatingsplit) {
            this.updatingsplit = true
            this.calculateDimensions(this.props.split)
            this.setState({
                split:this.props.split
            },() => {
                this.updatingsplit = false
            })
        }

        if (this.props.currentQuadPosition != this.state.currentQuadPosition) {
            setTimeout(() => {
                this.changeCurrentQuad(this.props)
            })
        }
    }

    calculateTransitionPosition = quadrant => {

        let {split} = this.state
        let top = null
        let left = null
        let right = 'auto'
        let bottom = 'auto'
        switch (quadrant) {
            case 'topleft': {
                switch (split) {
                    case 'none':
                        top = '0'
                        left = '0'
                        break
                    case 'horizontal':
                        top = '0'
                        left = '0'
                        break
                    case 'vertical':
                        top = '0'
                        left = '0'
                        break
                    case 'matrix':
                        top = '0'
                        left = '0'
                        break
                }
                break
            }
            case 'topright': {
                switch (split) {
                    case 'none':
                        top = '0'
                        left = -this.element.current.parentElement.offsetWidth + 'px' 
                        break
                    case 'horizontal':
                        top = '0'
                        left = '0'
                        break
                    case 'vertical':
                        top = '0'
                        left = -this.element.current.parentElement.offsetWidth + 'px' 
                        break
                    case 'matrix':
                        top = '0'
                        left = '0'
                        break
                }
                break
            }
            case 'bottomleft': {
                switch (split) {
                    case 'none':
                        top = -this.element.current.parentElement.offsetHeight + 'px' 
                        left = '0'
                        break
                    case 'horizontal':
                        top = -this.element.current.parentElement.offsetHeight + 'px' 
                        left = '0'
                        break
                    case 'vertical':
                        top = '0'
                        left = '0'
                        break
                    case 'matrix':
                        top = '0'
                        left = '0'
                        break
                }
                break
            }
            case 'bottomright': {
                switch (split) {
                    case 'none':
                        top = -this.element.current.parentElement.clientHeight + 'px' //offsetHeight + 'px'
                        left = -this.element.current.parentElement.clientWidth + 'px' //offsetWidth + 'px'
                        break
                    case 'horizontal':
                        top = -this.element.current.parentElement.clientHeight + 'px' //offsetHeight + 'px'
                        left = '0'
                        break
                    case 'vertical':
                        top = '0'
                        left = -this.element.current.parentElement.clientWidth + 'px' //offsetWidth + 'px'
                        break
                    case 'matrix':
                        top = '0'
                        left = '0'
                        break
                }
                break
            }
        }
        this.positions = {
            top,
            left,
            right,
            bottom,
        }

    }

    calculatePosition = (quadrant) => {

        let top = 'auto'
        let left = 'auto'
        let right = 'auto'
        let bottom = 'auto'
        switch (quadrant) {
            case 'topleft': {
                top = '0'
                left = '0'
                break
            }
            case 'topright': {
                top = '0'
                right = '0'
                break
            }
            case 'bottomleft': {
                bottom = '0'
                left = '0'
                break
            }
            case 'bottomright': {
                bottom = '0'
                right = '0'
                break
            }
        }

        this.positions = {
            top,
            left,
            right,
            bottom,
        }
    }

    calculateDimensions = (split) => {
        let width = null
        let height = null
        switch (split) {
            case 'none':{
                width = '200%'
                height = '200%'
                break
            }
            case 'horizontal': {
                width = '100%'
                height = '200%'
                break
            }
            case 'vertical': {
                width = '200%'
                height = '100%'
                break
            }
            case 'matrix': {
                width = '100%'
                height = '100%'
                break
            }
        }

        this.dimensions = {
            width,
            height,
        }

    }

    render() {
        const { classes } = this.props
        let { left, right, top, bottom } = this.positions

        let {width, height} = this.dimensions

        return (
            <div id = "quadplatform"
                className = { classes.root }
                style = {{
                    width,
                    height,
                    top,
                    left,
                    bottom,
                    right,
                }} 
            ref = {this.element}
            >
                { this.props.children }
            </div>        
        )
    }
}

export default withStyles(styles)(QuadPlatform)