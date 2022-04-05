import React, { useEffect, useRef, useState ,forwardRef, useImperativeHandle, Component} from 'react';
import { QueryObserver } from 'react-query';
import { Link,Router } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ChangeNavigationStyle } from './atom';
import SearchInput from './SearchInput';



const MainNavigation = styled.div<{changeNavigationStyle?: boolean}>`
  /*  */
  z-index: 99;
  background:whitesmoke;
  color: black;
  display: flex;
  
  align-items: center;
  height: ${props => props.changeNavigationStyle ?  '5rem': '5.8rem' };
  width: 100%;
  position: fixed;
  font-size: ${props => props.changeNavigationStyle ?  '0.875rem':'1.125rem'};
  font-weight: bold;
  box-shadow: ${props => props.changeNavigationStyle ? 'none':'2px 2px 3px grey;'};
  transition: all 0.5s;
  svg {
    top: 1.0625rem;
    left: ${props => props.changeNavigationStyle ? '14.575rem': '14.7rem'  };
    width: 1.25rem;
    fill: black;
    position: absolute;
    z-index:1000;
    transition: all 0.5s;
  }
  button {
    width: 3.125rem;
    z-index: 1;
    position: absolute;
    top: 1.125rem;
    left:30rem;
    border: 0;
    background-color: white;
    font-weight: bold;
    border-radius: 1.5625rem;
    cursor: pointer;
    transition: all 0.5s;
  }
  button:hover {
    color: rgb(200, 200, 200);
  }
  button:active {
    color: rgb(55, 55, 255);
  }
  h4{
    font-size:${props => props.changeNavigationStyle ?  '1.5rem': '1.75rem' };
    transition: all 0.5s;
  }
  span{

    min-width:175px;
  }
  @media(max-width:93.75rem){
    transition: all 0.5s;
    h4{
      font-size: 1.2rem;
      top:40%;
      left:5%;
    }
  }
  @media(max-width:73.75rem){
    transition: all 0.5s;
    h4{
      display:none;
    }
  }
  @media(max-width:50rem){
    transition: all 0.5s;
    span,a{
      display:none;
    }
    svg{
      top: 32%;
      left: 0.625rem;
      transition: all 0.5s;
    }
    button{
      top:35%;
      left:28.375rem;
    }
  }
`;


const NavigationList = styled.div`
display:flex;
justify-content:center;
align-items:center;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  position:absolute;
  a{
    width: 120px;
    margin-left: 5rem;
    color:inherit;
  }
`;
const Banner = styled.h4`
  width: 17.5rem;
  padding: 0;
  top:32%;
  left:10%;
  transform:translate(-10%,-10%);
  position:absolute;
  text-align: left;
  font-size: 1.75rem;
  font-weight: bold;
  color: rgb(110,5,55);
  margin-bottom: 1.5rem;
  
`;

const TopNavigation = ({setIsSearching,setIsScrollLoading}:any) => {
  const [changeNavigationStyle] = useRecoilState(ChangeNavigationStyle);
    return (
        <MainNavigation changeNavigationStyle={changeNavigationStyle} >
        <Banner>우리동네 착한가게</Banner>
        <NavigationList>
          <SearchInput setIsSearching={setIsSearching} setIsScrollLoading={setIsScrollLoading}/>
          <Link to={"/"}>착한가게란?</Link>
        </NavigationList>
      </MainNavigation>
    );
};

export default TopNavigation;