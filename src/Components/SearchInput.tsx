import React, { FormEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { saveInputValue, searchInputValue } from './atom';

const SearchNavigation = styled.div<{changeNavigationStyle?: boolean}>`
display:flex;
justify-content:center;
align-items:center;
gap: 3.125rem;
position:relative;
  input {
    padding: 0rem 1.875rem;
    width: 15.625rem;
    height: 3.125rem;
    border-radius: 1.25rem;
    font-size: 1rem;
    position: relative;
  }
  input:focus{
    outline:none;
  }
  a{
    min-width:10.9375rem;
    color:inherit;
  }
  a:hover{
    color: rgb(200,200,200);
    transition: all 0.5s;
  }
  a:active {
    color: rgb(155, 255, 55);
  }
  @media(max-width:50rem){
    input{
      width:450px;
      
    }
    input:placeholder-shown{
      border: 5px solid teal;
      color:red;
      font-style:italic;
    }
  }
`;
const SearchInput = ({setIsSearching,setIsScrollLoading}:any) => {
    const [searchInputVal,setSearchInputVal] = useRecoilState<any>(searchInputValue)
    const [saveInputVal,setSaveInputVal] = useRecoilState<any>(saveInputValue)
    
    const onSearchValue =useCallback((e:React.KeyboardEvent<HTMLInputElement>):void =>{
        if(e.key === 'Enter'){
        setSearchInputVal(e.currentTarget.value);
    }
    },[setSearchInputVal])
    const onSubmitValue = useCallback((event) => {
        event.preventDefault();
        setIsSearching(true);
        setIsScrollLoading(true);
        setSaveInputVal(((prev:any) => [...prev,searchInputVal]));
        // console.log("세이브벨류"+saveInputVal);
    },[setSaveInputVal,searchInputVal,setIsSearching,setIsScrollLoading])
    return (
        <SearchNavigation>
        <span>착한가게 찾아보기 ☞</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
        </svg>
        <form onSubmit={onSubmitValue}>
        <input onKeyUp={onSearchValue} defaultValue={searchInputVal} type="text" placeholder='착한가게 찾아보기' />
        <button type="submit">찾기</button>
        </form>
      </SearchNavigation>
    );
};

export default SearchInput;