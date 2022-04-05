import { useEffect, useRef, useState } from 'react';




// interface IPageEnd{
//     nextPage: RefObject<HTMLDivElement>
//    }
//    interface useIntersectionObserverProps {
//     root?: null;
//     rootMargin?: string;
//     threshold?: number;
//     onIntersect: IntersectionObserverCallback;
//   }
    // const useDivPosition = ({nextPage}:any) =>{
    //   useEffect(() =>{
    //     console.log(nextPage)
    //   })
    //   return null;
    // }
    // useEffect2 . loading값이 변경될 때마다 실행
    // useEffect(() => {
    //   // fetch에서 loading이 true로 바뀐다면
    //   if(loading){
    //     //new 생성자로 IntersectionObserver 객체를 통해 변수 observer를 생성한다.
    //     const observer:IntersectionObserver = new IntersectionObserver((entries) =>{
    //       // Io의 첫번째 인자는 콜백함수. entries를 인자로 받는 콜백 함수에서 인스턴스의 배열의 첫번째 값이 IntersectionObserverEntry이다.
    //       // 관찰 대상의 교차 상태가 true라면
    //       if(entries[0].isIntersecting){
    //         //pageNumberIncrease 함수 호출
    //         pageNumberIncrease();
    //       }
    //     },
    //     //threshold는 옵저버가 언제 실행되는지 정해주며 0부터 1까지의 숫자를 입력할 수 있다.0부터 1은 대상의 height값의 persentage다.
    //     {threshold:0},
    //     );
    //   //관찰할 대상을 등록.
    //     observer.observe(nextPage.current)
    //   }
    // })
    // const useNextPage = () => {
    //   const onIntersect: IntersectionObserverCallback = ([{isIntersecting}]) => {
    //     console.log(`감지결과 : ${isIntersecting}`)
    //   }
    //   const {setTarget} = useIntersectionObserver({onIntersect})

    //   return <div ref={nextPage} style={{ width: '100%', height: '30px' }}></div>;
    // }
// const SAMPLE_URL =
//   'https://api.odcloud.kr/api/3045247/v1/uddi:1c782e6f-9281-451d-aa04-a550074abc2d?page=1&perPage=2&serviceKey=HdgqKrzt9tddkO%2B3ZaQ3KjO9IA5uT23vcj33Zg6BmTby1kd2tNsD3rSVOjx8rg84A60ItTkVEEGdViZxMYjwCw%3D%3D';

// export async function fetchGoodStore(){
//     return await fetch('https://api.odcloud.kr/api/3045247/v1/uddi:1c782e6f-9281-451d-aa04-a550074abc2d?page=1&perPage=10&serviceKey=HdgqKrzt9tddkO%2B3ZaQ3KjO9IA5uT23vcj33Zg6BmTby1kd2tNsD3rSVOjx8rg84A60ItTkVEEGdViZxMYjwCw%3D%3D')
//     .then((response) => response.json()).then((response) => console.log(response));
// }






interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = ({
 
  onIntersect,
}: useIntersectionObserverProps) => {


  const [nextPage,setNextPage] = useState<HTMLDivElement | null | undefined>(null);
  // const nextPage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!nextPage) {
      return;
    }
    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { threshold: [0] }
    );
    observer.observe(nextPage);
    return () => observer && observer.disconnect();
  });
  

  return {setNextPage};
  // const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  // useEffect(() => {
  //   if (!target) return;

  //   const observer: IntersectionObserver = new IntersectionObserver(
  //     onIntersect,
  //     { root, rootMargin, threshold }
  //   );
  //   observer.observe(target);

  //   return () => observer.unobserve(target);
  // }, [onIntersect, root, rootMargin, target, threshold]);

  // return { setTarget };
};

export default useIntersectionObserver;