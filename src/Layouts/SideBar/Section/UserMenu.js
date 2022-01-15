import React, { Component } from 'react'
import '../SideBar.scss'

export class UserMenu extends Component {
    render() {
        const userMenu = ['Capability', 'Attribute'];

        const userMenuList = userMenu.map((menu, index) => (<li className='sidebar_item_detail' key={index}>{menu}</li>));

        return (
            <div className='sidebar_container'>
                <ul className='sidebar_item'>{userMenuList}</ul>
            </div>
        )
    }
}

export default UserMenu
