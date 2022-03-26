import React, {
  Component,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import useIntersectionObserver from './Hooks/useIntersectionObserver';
import TopNavigation from './Components/TopNavigation';
import { isTemplateExpression } from 'typescript';
import { useScroll } from './Components/useScroll';
import { useRecoilState } from 'recoil';
import { ChangeNavigationStyle, saveInputValue, searchInputValue } from './Components/atom';
import { useQuery } from 'react-query';
import { fetchAllStore } from './api';

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
  padding: 0px 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color:whitesmoke;
`;

const Card = styled.ul`
  
  min-width: 480px;
  border: 2px solid rgb(110,5,55);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 10px 10px;
  padding: 20px 0px;
  background: whitesmoke;
  
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgb(215,200,215);
  &:hover {
    box-shadow: 4px 4px 6px grey;
    transform: translate(0px, -10px);
    transition: all 0.2s;
  }
  li{
    font-family: cursive;
  }
`;
const Menu = styled.li`
  font-size: 1.4rem;
  font-weight:bold;
`
const StoreTitle = styled.li`

  font-size: 28px;
  font-weight: bold;
  color:rgb(110,5,55);
`;
const filterString = [
  '미용업',
  '미용',
  '숙박업',
  '미용실',
  '헤어',
  '이용업',
  '이미용업',
  '기타서비스업',
  '세탁업',
  '목욕업',
];

function App() {
  const [searchInputVal,setSearchInputVal] = useRecoilState<any>(searchInputValue)
  const [storeList, setStoreList] = useState<any>([]);
  const [changeNavigationStyle, setChangeNavigationStyle] = useRecoilState(ChangeNavigationStyle);
  const [pageNumber, setPageNumber] = useState(1);
  const [isScrollLoading, setIsScrollLoading] = useState<any>(true);
  const nextPage = useRef<HTMLDivElement>(null);
  const navigationTarget = useRef<HTMLDivElement>(null);
  const {data,isLoading,isFetching,isError,error} = useQuery('AllStore',fetchAllStore)
  const [isSearching, setIsSearching] = useState<any>(false);
  const {scrollY} = useScroll();
  // const naviroot = useRef<HTMLDivElement>(null);
  const fetchGoodStore = async (pageNumber: number) => {
    const res = await fetch(
      `https://api.odcloud.kr/api/3045247/v1/uddi:1c782e6f-9281-451d-aa04-a550074abc2d?page=${pageNumber}&perPage=6&serviceKey=HdgqKrzt9tddkO%2B3ZaQ3KjO9IA5uT23vcj33Zg6BmTby1kd2tNsD3rSVOjx8rg84A60ItTkVEEGdViZxMYjwCw%3D%3D`
    );
    const data = await res.json();
    setStoreList((prev: any) => [
      ...prev,
      data.data.filter(({ 업종 }: any) => !filterString.includes(업종)),
    ]);
    setIsScrollLoading(false);
  };
  useEffect(() => {
    fetchGoodStore(pageNumber);
  }, [pageNumber]);

  const pageNumberIncrease = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

useEffect(()=>{
  if(scrollY > 50){
    setChangeNavigationStyle(true)
  }else{
    setChangeNavigationStyle(false)
  }
},[scrollY])
useEffect(()=>{console.log(data?.data.data.filter(({업종}:any) => !filterString.includes(업종)).map((storeArray:any) => Object.values(storeArray)).filter((store:any) => store.join(',').includes(searchInputVal)))
return;}
,[data?.data.data,searchInputVal])
  
  useEffect(() => {
    if (!nextPage.current) {
      return;
    }
    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { threshold: [0] }
    );
    observer.observe(nextPage.current as Element);
    return () => observer && observer.disconnect();
  });
  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        pageNumberIncrease();
        observer.unobserve(entry.target);
        setIsScrollLoading(true);
      }
    });
  };
  return (
    <div>
      <TopNavigation setIsSearching={setIsSearching} setIsScrollLoading={setIsScrollLoading}/>
      
        <div ref={navigationTarget} style={{ height: '100px' }}></div>
     
      <Containner>
      {/* isSearching이면 검색 결과 페이지 로딩 */}
        {isSearching ? data?.data.data.filter(({업종}:any) => !filterString.includes(업종)).map((storeArray:any) => Object.values(storeArray)).filter((store:any) => store.join(',').includes(searchInputVal)).map((store: any) =>
           (
            <Card key={store[4]}>
              <StoreTitle>
                ({store[8]}){store[7]}
              </StoreTitle>
              <Menu> {store[2]}</Menu>
              <li>{store[0]} 원</li>
              <li>
                {store[5]} {store[11]}
              </li>
              <li>영업시간: {store[10]} </li>
              <li>
                주차: {store[3] === 'N' ? '불가' : '가능'}{' '}
              </li>
              <li>
                배달: {store[12] === 'N' ? '불가' : '가능'}{' '}
              </li>
              
              <li>가게 연락처 : {store[9]} </li>
            </Card>
          ))
         : storeList.map((storeArray: any) =>
        storeArray.map((store: any) => (
          <Card key={store.순번}>
            <StoreTitle>
              ({store.업종}){store.업소명}
            </StoreTitle>
            <Menu> {store.대표품목}</Menu>
            <li>{store.가격.toLocaleString()} 원</li>
            <li>
              {store['시/군/구']} {store['주소(도로명 새주소 명기)']}
            </li>
            <li>영업시간: {store.영업시간} </li>
            <li>
              주차: {store.주차가능여부 === 'N' ? '불가' : '가능'}{' '}
            </li>
            <li>
              배달: {store.배달가능여부 === 'N' ? '불가' : '가능'}{' '}
            </li>
            
            <li>가게 연락처 : {store.연락처} </li>
          </Card>
        ))
      )}
        {!isScrollLoading && (
          <div ref={nextPage} style={{ width: '100%', height: '200px' }} />
        )}
      </Containner>
    </div>
  );
}

export default App;
