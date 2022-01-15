import React, { Component } from 'react';
import RightMenu from './Section/RightMenu';
import { ClusterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './Header.scss';

const HeaderStyled = styled.header`
    display: flex;
    position:sticky;
    background-color: #001529;
    top:0;
    justify-content: space-between;
    align-items: center;
`


export class Header extends Component {
    render() {
        return (
            <HeaderStyled>
                <div>

                    <ClusterOutlined style={{ color: "white", fontSize: "4rem", margin: "20px" }} />
                </div>
                <nav>
                    <RightMenu />
                    {/* <div className='header-logo'>
                    <div id='base'></div>
                    <div id='base-in'></div>

                    <div className='loadingBox'>
                    <div className='dim'></div>
                    <div className='circle'></div>
                </div>


                </div>
 */}
                </nav>
            </HeaderStyled>
        )
    }
}

export default Header
