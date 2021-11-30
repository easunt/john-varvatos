import React, { Component } from 'react'
import './Header.scss'

export class Header extends Component {
    render() {
        return (
            <nav className='header'>
                <div className='header-logo'>
                    <div id='base'></div>
                    <div id='base-in'></div>

                </div>

                <div className='loadingBox'> 
                        <div className='dim'></div>
                        <div className='circle'></div>
                    </div>


                <ul className='header-container'>
                    <li className='header-item'><a href='#'>사용자 관리</a></li>
                    <li className='header-item'><a href='#'>기기 관리</a></li>
                    <li className='header-item'><a href='#'>사용자 기기관리</a></li>           
                </ul>
            </nav>
        )
    }
}

export default Header
