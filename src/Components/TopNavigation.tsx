import React, { useRef } from 'react';
import styled from 'styled-components';

const MainNavigation = styled.div`
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  display: flex;
  border: 1px solid black;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
  position: fixed;
  font-size: 18px;
  font-weight: bold;
  li svg {
    top: 40px;
    margin-left: 10px;
    z-index: 1;
    width: 20px;
    fill: black;
    position: absolute;
  }
  button {
    min-width: 50px;
    z-index: 1;
    width: 20px;
    position: absolute;
    top: 40px;
    right: 49rem;
    border: 0;
    background-color: white;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
  }
  button:hover {
    color: rgb(150, 150, 150);
  }
  button:active {
    color: rgb(5, 5, 155);
  }
  input {
    padding: 0px 30px;
    width: 250px;
    height: 50px;
    border-radius: 20px;
    font-size: 20px;
    position: relative;
  }
`;
const NavigationList = styled.ul`
  display: flex;
  align-items: center;
  gap: 120px;
  li:first-child {
    margin-right: 200px;
  }
`;
const Banner = styled.li`
  min-width: 280px;
  padding: 0;
  margin: 0;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  color: rgb(200, 20, 50, 0.8);
  margin-bottom: 24px;
`;
const TopNavigation = () => {
    const navigation = useRef<HTMLDivElement>(null);
    
    return (
        <MainNavigation ref={navigation}>
        <Banner>우리동네 착한가게</Banner>
        <NavigationList>
          <li>
            착한가게 찾아보기{' '}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
            </svg>
            <input type="text" />
            <button>찾기</button>
          </li>
          <h4>착한가게 등록하기</h4>
          <li>착한가게란?</li>
        </NavigationList>
      </MainNavigation>
    );
};

export default TopNavigation;