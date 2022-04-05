import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { MdSettingsRemote } from 'react-icons/md';
import { sortedSearchingStore } from './atom';
import { useRecoilState } from 'recoil';
const SidebarWrapper = styled.div`
  padding: 1.55rem;
  font-family: cursive;
  position: fixed;
  width: 5.75rem;
  height: 50%;
  border-radius: 5px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 10px grey;
  border-right: 0;
  display: flex;
  flex-direction: column;
  right: 2%;
  top: 25%;
`;
const ButtonsWrapper = styled.div`
  margin-top: 50%;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    text-indent: 2px;
    line-height: 1.1;
    font-weight: bold;
    font-size: 0.9rem;
    width: 7.5rem;
    padding: 1rem 0rem;
    border: 1px solid rgb(110, 5, 55, 0.5);
    margin: 0.3125rem;
    border-radius: 3.5rem;
    box-shadow: 2px 2px 1px rgb(110, 5, 55);
  }
  button:hover {
    box-shadow: 2px 2px 8px rgb(110, 5, 55);
    cursor: pointer;
  }
`;
const Sidebar = () => {
  const [sortedStore,setSortedStore] = useRecoilState<any>(sortedSearchingStore);
  const handleStoreSort = (e: any) => {
    // console.log(sortedStore[0].slice().sort((a:any,b:any) => { return a[0] - b[0]}));
   console.log(sortedStore)
    // const newArray = sortedStore;
    // this.devices = devicesLoaded.map(device => {return {...device};});
    switch (e.target.value) {
      
      case '1': setSortedStore((prev:any) => {
       
        const newArray = [...prev];
        const newSort = [...newArray[0].slice().sort((a:any,b:any) => { return a[0] - b[0]})]
        newArray.splice(0,1,newSort);
        return newArray;
      });
        break;
      case '2':
        console.log(sortedStore);
        break;
      case '3':
        console.log(sortedStore);
        break;
      case '4':
        console.log(sortedStore);
        break;
    }
  };
  return (
    <SidebarWrapper>
      <p style={{ textAlign: 'center' }}>
        <MdSettingsRemote style={{ fontSize: '3rem' }} />
      </p>
      <ButtonsWrapper onClick={handleStoreSort}>
        <button value={1}>가격순 정렬</button>
        <button value={2}>이름순 정렬</button>
        <button value={3}>업종별 정렬</button>
        <button value={4}>지역별 정렬</button>
      </ButtonsWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
