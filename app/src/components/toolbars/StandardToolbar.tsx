// StandardToolbar.tsx
// copyright (c) 2023-present Henrik Bechmann, Toronto, Licence: GPL-3.0

import React, {useMemo, CSSProperties} from 'react'
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {
  Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup,
  Tooltip, Box
} from '@chakra-ui/react'

import { useUserData, useAuth } from '../../system/FirebaseProviders'

import LearnIcon from './LearnIcon'
import MenuIcon from './MenuIcon'
import MenuControl from './MenuControl'
import StandardIcon from './StandardIcon'
import ToolbarVerticalDivider from './VerticalDivider'

import fireIcon from '../../../assets/fire.png'
import notificationsIcon from '../../../assets/notifications.png'
import chatIcon from '../../../assets/chat.png'
import messageIcon from '../../../assets/mail.png'
import helpIcon from '../../../assets/help.png'
import homeIcon from '../../../assets/home.png'
import subscriptionsIcon from '../../../assets/subscriptions.png'
import appSettingsIcon from '../../../assets/app_settings.png'

// ----------------------------- static values -----------------------------
const standardToolbarStyles = {
    minHeight:0,
    display:'flex',
    flexDirection:'row',
    flexWrap:'nowrap',
    whitespace:'nowrap',
    alignItems:'center',
    // height:'40px',
    boxSizing:'border-box',
    backgroundColor:'#dfecdf', //'#f2f2f2',
    borderRadius:'8px',

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

const smallerIconStyles = {
    height:'18px', 
    width:'18px'
}

const downArrowWrapperStyles = {
    display:'inline-block',
}

const downArrowStyles = {
    opacity:0.5, 
    fontSize:'small',
}

const fireIconControlStyles = {
    display:'flex',
    flexWrap:'nowrap',
    alignItems:'center',
    padding:'2px',
    borderRadius:'6px',
    marginLeft:'6px',
} as CSSProperties

const avatarStyles = {
    width:'24px', 
    height:'24px', 
    borderRadius:'12px',
    // display:'inline-block',
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

// --------------------------- component ----------------------------
const StandardToolbar = (props) => {

    // ------------------------------ hooks ------------------------
    const 
        navigate = useNavigate(),
        userData = useUserData(),
        auth = useAuth(),
        { displayName, photoURL } = userData.authUser,
        isSuperUser = userData.sysadminStatus.isSuperUser

    // --------------------- navigation functions ------------------
    const 
        goHome = () => { navigate('/workspace') },
        gotoNotifications = () => { navigate('/workspace/notifications') },
        gotoMessages = () => { navigate('/workspace/messages') },
        gotoChatrooms = () => { navigate('/workspace/chatrooms') },
        gotoNewsflows = () => { navigate('/workspace/newsflows') },
        gotoSysadmin = () => { navigate('/sysadmin') },
        gotoAbout = () => { navigate('/about') },
        gotoNotices = () => { navigate('/notices') },
        gotoClassifieds = () => { navigate('/classifieds') },
        gotoAccount = () => { navigate('/account') },
        gotoDomains = () => { navigate('/account/domains') },
        gotoMemberships = () => { navigate('/account/memberships') },
        gotoSubscriptions = () => { navigate('/account/subscriptions') },
        logOut = () => {
            signOut(auth).then(() => {
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            })
        }

    const tribalopolismenulist = useMemo(() => {
       return <MenuList>
                <MenuItem isDisabled onClick = {gotoClassifieds} >Classifieds&nbsp;<span style = {{fontStyle:'italic'}}>[pending]</span></MenuItem>
                <MenuDivider />
                <MenuItem onClick = {gotoNotices}>General notices</MenuItem>
                <MenuItem onClick = {gotoAbout}>About</MenuItem>
            </MenuList>
    },[])

    const currentusermenulist = useMemo(() => {

        return <MenuList>
            <MenuItem onClick = {gotoAccount}>Account Settings</MenuItem>
            <MenuDivider />
            <MenuGroup title = 'MANAGE...'>
                <MenuItem onClick = {gotoSubscriptions}>Newsflow subscriptions</MenuItem>
                <MenuItem onClick = {gotoMemberships}>Workgroup memberships</MenuItem>
                <MenuItem onClick = {gotoDomains}>Account workgroups</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick = {logOut}>Sign out</MenuItem>
        </MenuList>

    },[])

    // render
    return <Box style = {standardToolbarStyles}>
        <MenuIcon icon = {fireIcon} caption = 'Tribalopolis' tooltip = 'Tribalopolis menu' menulist = {tribalopolismenulist} />
        <ToolbarVerticalDivider />
        <StandardIcon icon = {notificationsIcon} caption = 'notices' tooltip = 'Notifications to this account' response = {gotoNotifications} />
        <StandardIcon icon = {messageIcon} caption = 'direct' tooltip = 'Direct messages' response = {gotoMessages} />
        <StandardIcon icon = {chatIcon} caption = 'chats' tooltip = 'Chatrooms with this account' response = {gotoChatrooms} />
        <StandardIcon icon  = {subscriptionsIcon} caption = 'newsflows' tooltip = 'Subscribed news flows' response = {gotoNewsflows} />
        <LearnIcon tooltip = 'Explain this toolbar'/>
        <ToolbarVerticalDivider />
        <StandardIcon icon = {homeIcon} caption = 'workspace' tooltip = 'Go to the main work page' response = {goHome} />
        <ToolbarVerticalDivider />
        <MenuControl displayName = {displayName} icon = {photoURL} tooltip = 'Options for current user' caption = 'current user' menulist = {currentusermenulist} />
        {isSuperUser && <>
            <ToolbarVerticalDivider />
            <StandardIcon icon = {appSettingsIcon} caption = 'system' tooltip = 'System settings' response = {gotoSysadmin} />
            </>
        }
        <span>&nbsp;&nbsp;</span>
    </Box>
}

export default StandardToolbar
