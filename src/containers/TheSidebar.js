import React from 'react';
import {
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'
import { TheSidebarNav } from './TheSidebarNav';
import SimpleBar from 'simplebar-react'

const TheSidebar = () => {

    return (
    <CSidebar>
        <CSidebarNav>
            <img src="./homelogo.png" className="mt-2 mb-3 ml-auto mr-auto" width="70%" alt='logo' />
            <SimpleBar>
                <TheSidebarNav items={navigation} />
            </SimpleBar>
            {/* <CCreateElement
                items={navigation}
                components={{
                    CSidebarNavItem,
                    CSidebarNavTitle
                }}
            /> */}
        </CSidebarNav>
        <CSidebarToggler className="c-d-md-down-none" />
    </CSidebar>
    )
}

export default React.memo(TheSidebar)
