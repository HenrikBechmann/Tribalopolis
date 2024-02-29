// workwindow.tsx
// copyright (c) 2024-present Henrik Bechmann, Toronto, Licence: GPL-3.0

import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react'

import {
    Grid, GridItem,
    Box
} from '@chakra-ui/react'

import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'
import "react-resizable/css/styles.css"

import dragCornerIcon from '../../assets/drag-corner.png'
import windowMinimalIcon from '../../assets/window-minimal.png'
import windowFloatIcon from '../../assets/window-float.png'
import windowFullIcon from '../../assets/window-full.png'
import moreVertIcon from '../../assets/more_vert_light.png'

const MAX_RATIO = 0.9

const windowStyles = {
    position: 'absolute',
    top:'20px',
    left: '20px',
    border: '2px solid silver',
    borderRadius: '8px 8px 0 8px',
    boxShadow: '0 2px 7px 3px gainsboro',
} as CSSProperties

const titleStyles = {
    width: '100%',
    borderBottom:'2px solid silver',
    borderRadius: '7px 7px 0 0',
    padding: '3px',
    backgroundColor:'gainsboro',
    display: 'grid',
    gridAutoFlow: 'column',
} as CSSProperties

const textBlockStyles = {
    overflow:'clip',
    minWidth:0,
    fontSize:'small', 
    textWrap:'nowrap', 
    textOverflow: 'ellipsis',   
}  as CSSProperties

const windowIconGroupStyles = {
    marginLeft:'auto',
    borderRadius: '0 7px 0 0',
    display:'flex',
} as CSSProperties

const contentStyles = {
    position: 'absolute',
    inset: 0, 
    padding: '3px', 
    backgroundColor: 'ghostwhite',
    borderRadius: '0 0 7px 7px',
} as CSSProperties

const handleStyles = {
    position:'absolute',
    bottom:0,
    right:0,
    borderRadius:'0 0 7px 0',
    display:'flex',
    justifyContent: 'right',
    alignItems: 'end',
    padding:'2px',
    height:'24px',
    width: '24px',
} as CSSProperties

const handleIconStyles = {
    opacity:0.5, 
    height:'12px', 
    width:'12px',
}

const WindowHandle = (props) => {

    // handleAxis for handle selection - n/a here
    const { handleAxis, innerRef, ...rest } = props

    return (
        <Box ref = {innerRef} data-type = 'resize-handle' style = {handleStyles} {...rest}>
            <img draggable = "false" src = {dragCornerIcon} style = {handleIconStyles} />
        </Box>
    )
}

const Workwindow = (props) => {

    const 
        {children, locationDefaults, sizeDefaults, sessionID, zOrder, setFocus, containerSpecs} = props,
        [windowState, setWindowState] = useState('setup'), // assure proper internal initialization of resizable (!)
        [windowSizeSpecs, setWindowSizeSpecs] = useState({width:parseInt(sizeDefaults.width), height:parseInt(sizeDefaults.height)}),
        windowElementRef = useRef(null),
        titleElementRef = useRef(null),
        zOrderRef = useRef(null),
        localWindowStyles = {...windowStyles,...locationDefaults, width:windowSizeSpecs.width + 'px', height:windowSizeSpecs.height + 'px'},
        localTitleStylesRef = useRef(titleStyles),
        maxConstraintsRef = useRef([700,700])

    zOrderRef.current = zOrder

    // set onFocus and onBlur event listeners
    useEffect(()=>{

        const element = windowElementRef.current

        const onFocus = (event) => {
            setFocus && setFocus(zOrderRef.current)
            titleElementRef.current.style.backgroundColor = 'lightskyblue'
        }

        const onBlur = (event) => {
            titleElementRef.current.style.backgroundColor = 'gainsboro'
        }

        element.addEventListener('focus',onFocus)

        element.addEventListener('blur',onBlur)

        return () => {
            element.removeEventListener('focus', onFocus)
            element.removeEventListener('blur', onBlur)
        }

    },[])

    // apply inherited zOrder on change
    useEffect(()=>{

        windowElementRef.current.style.zIndex = zOrder

    },[zOrder])

    // resizable requires this assurance of proper internal initialization for first call from any window
    useEffect(()=>{

        if (windowState == 'setup') setWindowState('ready')

    },[windowState])

    // adjust window size to fit in container size
    useEffect(()=>{

        if (!containerSpecs) return

        const element = windowElementRef.current
        const windowSpecs = {
            width: element.offsetWidth,
            height: element.offsetHeight,
            top: element.offsetTop,
            left: element.offsetLeft
        }

        const widthBound = windowSpecs.width + windowSpecs.left
        const heightBound = windowSpecs.height + windowSpecs.top

        if (containerSpecs.width < widthBound || containerSpecs.height < heightBound) {
            // adjustment required
            let newWidth, newHeight, newLeft, newTop, widthDelta, heightDelta, widthApplied, heightApplied
            if (containerSpecs.width < widthBound) {
                widthDelta = widthBound - containerSpecs.width
                newLeft = Math.max(0,windowSpecs.left - widthDelta)
                widthApplied = windowSpecs.left - newLeft
                if (widthApplied) {
                    element.style.left = newLeft + 'px'
                    windowSpecs.left = newLeft
                }
                widthDelta -= widthApplied
                newWidth = windowSpecs.width - widthDelta
            } else {
                newWidth = windowSpecs.width
            }

            if (containerSpecs.height < heightBound) {
                heightDelta = heightBound - containerSpecs.height
                newTop = Math.max(0,windowSpecs.top - heightDelta)
                heightApplied = windowSpecs.top - newTop
                if (heightApplied) {
                    element.style.top = newTop + 'px'
                    windowSpecs.top = newTop
                }
                heightDelta -= heightApplied
                newHeight = windowSpecs.height - heightDelta
            } else {
                newHeight = windowSpecs.height
            }

            setWindowSizeSpecs({width:newWidth, height:newHeight})

        }

        // maintain window resize within bounds
        maxConstraintsRef.current = [containerSpecs.width - windowSpecs.left, containerSpecs.height - windowSpecs.top]

    },[containerSpecs])

    // resiable callbacks...
    const onResizeStart = (event, {size, handle}) => {

        windowElementRef.current.focus()

    }

    const onResize = (event, {size, handle}) => {

        setWindowSizeSpecs({width:size.width,height:size.height})

    }

    const onResizeStop = () => {

    }

    // draggable callback
    const onDragStart = () => {

        windowElementRef.current.focus()

    }

    // render
    return (
    <Draggable
        handle = '#title'
        bounds = 'parent'
        onStart = {onDragStart}
    >
        <Resizable 
            data-inheritedtype = 'resizable' 
            handle = {

                (handleAxis, ref) => <WindowHandle 
                    innerRef = {ref} 
                    handleAxis = {handleAxis}
                />
            } 
            height = {windowSizeSpecs.height} 
            width = {windowSizeSpecs.width} 
            axis = 'both'
            resizeHandles = {['se']}
            minConstraints = {[200,200]}
            maxConstraints = {maxConstraintsRef.current}
            onResizeStart = {onResizeStart}
            onResize = {onResize}
            onResizeStop = {onResizeStop}

        >
            <Box tabIndex = {0} ref = {windowElementRef} data-type = 'window-frame' style = {localWindowStyles}>
                <Grid 
                    data-type = 'window-grid'
                    height = '100%' 
                    gridTemplateColumns = '1fr' 
                    gridTemplateRows = 'auto 1fr'
                    gridTemplateAreas = {`"header"
                                          "body"`}
                >
                    <GridItem data-type = 'window-header' gridArea = 'header' width = '100%' position = 'relative'>
                        <Box ref = {titleElementRef} id = 'title' data-type = 'window-title' style = {titleStyles}>
                            <Box data-type = 'text-block' style = {textBlockStyles}>
                                Henrik Bechmann (Domain)
                            </Box>
                            <Box data-type = 'window-icon-group' style = {windowIconGroupStyles}>
                                <img src = {windowMinimalIcon} />
                                <img src = {windowFloatIcon} />
                                <img src = {windowFullIcon} />
                                <img src = {moreVertIcon} />
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem data-type = 'window-body' gridArea = 'body' width = '100%' position = 'relative'>
                        <Box 
                            data-type = 'window-content' 
                            style = {contentStyles}
                        >{children}</Box>
                        <Box data-type = 'resize-handle' style = {handleStyles}>
                            <img src = {dragCornerIcon} style = {handleIconStyles} />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Resizable>
    </Draggable>)

} 

export default Workwindow