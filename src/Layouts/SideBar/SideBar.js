import React, { Component } from 'react'
import './SideBar.scss';

export class SideBar extends Component {
        
    render() {
    const devices = ['전구1','전구2','전구3','전구4','거실TV','컴퓨터'];
    const deviceList = devices.map((device)=>(<li className='sidebar_item_detail'><a href='#'>{device}</a></li>));

        return (
            <div className='sidebar_container'>
                <ul className='sidebar_item'>
                   {deviceList}
                </ul>
            </div>
        )
    }
}

export default SideBar
