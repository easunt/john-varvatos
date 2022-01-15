import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.div`
  display:flex;
  text-align:center;
`

const NavInner = styled.div`
  font-size:1.5rem;
  color:white;
  padding:20px;     
`

export class RightMenu extends Component {

  render() {
    return (
      <NavWrapper>
        <Link to="sys"><NavInner>시스템 관리</NavInner></Link>
        <Link to="user"><NavInner>사용자 기기관리</NavInner></Link>
      </NavWrapper>

    )
  }
}

export default RightMenu
