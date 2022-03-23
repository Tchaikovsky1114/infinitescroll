import React, {  useCallback, useEffect,  useMemo,  useRef, useState } from 'react';
import styled from 'styled-components';
import useIntersectionObserver from './Hooks/useIntersectionObserver';
import TopNavigation from './Components/TopNavigation';
import { isTemplateExpression } from 'typescript';


interface IJSON {
  currentCount: number;
  page: number;
  perPage: number;

  가격: number;
  대표자: string;
  대표품목: string;
  배달가능여부: string;
  순번: number;
  '시/군/구': string;
  '시/도': string;
  업소명: string;
  업종: string;
  연락처: string;
  영업시간: string;
  '주소(도로명 새주소 명기)': string;
  주차가능여부: string;
}
const Containner = styled.div`
  padding: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


const Wrapper = styled.ul`
  min-width: 450px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 10px 10px;
  padding: 20px 0px;
  background: linear-gradient(aliceblue, white);
  color: black;
  box-shadow: 2px 2px 3px grey;
`;


const StoreTitle = styled.li`
  font-size: 24px;
  font-weight: bold;
`;
// const {isLoading,data,error}:any = useQuery("goodStore",fetchGoodStore);
  // const goodStore = () => 
  //           for(let key in storeList){storeList[key].map((store:any) => 
  //           <Wrapper key={store.순번}>
  //           <StoreTitle>
  //             ({store.업종}){store.업소명}
  //           </StoreTitle>
  //           <li> {store.대표품목}</li>
  //           <li>{store.가격.toLocaleString()} 원</li>
  //           <li>
  //             {store['시/군/구']} {store['주소(도로명 새주소 명기)']}
  //           </li>
  //           <li>
  //             주차가능여부: {store.주차가능여부 === 'N' ? '불가능' : '가능'}{' '}
  //           </li>
  //           <li>
  //             배달가능여부: {store.배달가능여부 === 'N' ? '불가능' : '가능'}{' '}
  //           </li>
  //           <li>영업시간: {store.영업시간} </li>
  //           <li>가게 연락처 : {store.연락처} </li>
  //         </Wrapper>)}


function App() {
  const [storeList, setStoreList] = useState<any>([]);
  const filterString = ["미용업","미용","숙박업", "미용실" , "헤어" ,"이용업", "이미용업" , "기타서비스업" , "세탁업" , "목욕업"];
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const nextPage = useRef<HTMLDivElement>(null);
  
    const fetchGoodStore = async (pageNumber:number) => {
      const res = await fetch(`https://api.odcloud.kr/api/3045247/v1/uddi:1c782e6f-9281-451d-aa04-a550074abc2d?page=${pageNumber}&perPage=6&serviceKey=HdgqKrzt9tddkO%2B3ZaQ3KjO9IA5uT23vcj33Zg6BmTby1kd2tNsD3rSVOjx8rg84A60ItTkVEEGdViZxMYjwCw%3D%3D`)
      const data = await res.json();
      setStoreList((prev:any) => [...prev,data.data.filter(({업종}:any) => !filterString.includes(업종))] )
      setLoading(false); 
    }
    useEffect(()=>{
      fetchGoodStore(pageNumber);
    },[pageNumber])
    //helper function
    const pageNumberIncrease = () => {
      setPageNumber((prevPage) => prevPage + 1)
    }  

    const onIntersect: IntersectionObserverCallback = (entries,observer) =>{
      entries.forEach((entry) =>{
        if(entry.isIntersecting){
          
          pageNumberIncrease();
        //  fetchGoodStore(pageNumber);
          observer.unobserve(entry.target);
          setLoading(true);
      }
      })
    }
    useEffect(() => {
      
      if(!nextPage.current) return;
      const observer:IntersectionObserver = new IntersectionObserver(onIntersect,{threshold:[1.0]});
      observer.observe(nextPage.current as Element)
      return () => observer && observer.disconnect();
    })

    console.log(storeList);
    console.log(pageNumber);

    
  return (
    <>
    
      <TopNavigation />
      <Containner>
        {/* storeList.map((storeArray:any,idx:number) => storeArray.map((store:any) => store.가격)) */}
        {
        storeList.map((storeArray:any) => storeArray.map((store:any) =>
          <Wrapper key={store.순번}>
            <StoreTitle>
              ({store.업종}){store.업소명}
            </StoreTitle>
            <li> {store.대표품목}</li>
            <li>{store.가격} 원</li>
            <li>
              {store['시/군/구']} {store['주소(도로명 새주소 명기)']}
            </li>
            <li>
              주차가능여부: {store.주차가능여부 === 'N' ? '불가능' : '가능'}{' '}
            </li>
            <li>
              배달가능여부: {store.배달가능여부 === 'N' ? '불가능' : '가능'}{' '}
            </li>
            <li>영업시간: {store.영업시간} </li>
            <li>가게 연락처 : {store.연락처} </li>
          </Wrapper>
        ))}
        {!isLoading && <div ref={nextPage} style={{ width: '100%', height: '200px' }} /> }
      </Containner>
      
    </>
  );
}

export default App;
