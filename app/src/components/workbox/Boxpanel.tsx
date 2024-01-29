// Boxpanel.tsx
// copyright (c) 2023-present Henrik Bechmann, Toronto, Licence: GPL-3.0

import React, { useState, useRef, useEffect, useCallback, CSSProperties, forwardRef } from 'react'

import {
    Text, 
    Button, 
    Input, FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Box, VStack, Center
} from '@chakra-ui/react'

const panelStyles = {
    height:'100%',
    width: '250px',
    border: '5px ridge gray',
    backgroundColor:'ghostwhite',
    borderRadius:'8px',
}

const toggleStyles = {
    margin:'auto', 
    border:'initial', 
    backgroundColor:'transparent', 
    position:'relative',
    transition: 'width .5s',
} as CSSProperties

export const TogglePanel = (props) => {

    const 
        { children, targetDisplay, documentElementRef, foldersElementRef } = props,
        displayStateRef = useRef(targetDisplay),
        localStyles = {...panelStyles, ...toggleStyles},
        panelElementRef = useRef(null),
        [panelState, setPanelState] = useState('setup'),
        panelStateRef = useRef(null)

    panelStateRef.current = panelState

    useEffect(()=>{

        setPanelState('ready')

    },[])


    useEffect(()=>{

        if (panelStateRef.current != 'ready') return

        let timeout = 600

        if (targetDisplay == 'both') {

            panelElementRef.current.style.width = 
                (documentElementRef.current.offsetWidth + foldersElementRef.current.offsetWidth) + 'px'

        } else if (targetDisplay == 'document') {

            if (displayStateRef.current == 'folders') {

                panelElementRef.current.style.width = 
                    (documentElementRef.current.offsetWidth + foldersElementRef.current.offsetWidth) + 'px'

            } else {

                timeout = 0

            }

            setTimeout(()=>{
                panelElementRef.current.style.width = 
                    documentElementRef.current.offsetWidth + 'px'
            },timeout)

        } else { // 'folders'

            if (displayStateRef.current == 'document') {

                panelElementRef.current.style.width = 
                    (documentElementRef.current.offsetWidth + foldersElementRef.current.offsetWidth) + 'px'

            } else {

                timeout = 0

            }

            setTimeout(()=>{
                panelElementRef.current.style.width = 
                    foldersElementRef.current.offsetWidth + 'px'
            },timeout)

        }

        displayStateRef.current = targetDisplay

    },[targetDisplay])

    return <Box data-type = 'toggle-panel' ref = {panelElementRef} style = {localStyles}>{children}</Box>
} 

export const DocumentPanel = forwardRef(function DocumentPanel(props:any, ref:any) {
    const 
        { children, targetDisplay } = props,
        moreStyles = {position:'absolute', top:0,left:0, padding: '3px'} as CSSProperties,
        displayStateRef = useRef('document'),
        localStyles = {...panelStyles, ...moreStyles}

    useEffect(()=>{

        let timeout = 500

        if (targetDisplay == 'out') {

            setTimeout(()=>{
                ref.current.style.zIndex = 0
            },timeout)

        } else if (targetDisplay == 'over') {
            if (displayStateRef.current == 'out') {
                timeout = 0
            }
            setTimeout(()=>{
                ref.current.style.zIndex = 1
            },timeout)
        } else { // 'under'
            if (displayStateRef.current == 'out') {
                timeout = 0
            }
            setTimeout(()=>{
                ref.current.style.zIndex = 0
            },timeout)
        }

        displayStateRef.current = targetDisplay

    },[targetDisplay])

    return <div ref = {ref} data-type = 'document-panel' style = {localStyles}>{children}</div>
})

export const FoldersPanel = forwardRef(function FoldersPanel(props:any, ref:any) {
    const 
        { children, targetDisplay } = props,
        moreStyles = {position:'absolute',top:0,right:0, padding: '3px'} as CSSProperties,
        displayStateRef = useRef('folders'),
        localStyles = {...panelStyles, ...moreStyles}

    useEffect(()=>{

        let timeout = 500

        if (targetDisplay == 'out') {

            setTimeout(()=>{
                ref.current.style.zIndex = 0
            },timeout)

        } else if (targetDisplay == 'over') {
            if (displayStateRef.current == 'out') {
                timeout = 0
            }
            setTimeout(()=>{
                ref.current.style.zIndex = 1
            },timeout)
        } else { // 'under'
            if (displayStateRef.current == 'out') {
                timeout = 0
            }
            setTimeout(()=>{
                ref.current.style.zIndex = 0
            },timeout)
        }

        displayStateRef.current = targetDisplay

    },[targetDisplay])

    return <div ref = {ref} data-type = 'folders-panel' style = {localStyles}> {children}</div>

})
