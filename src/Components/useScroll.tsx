import { useState, useEffect } from "react";

export function useScroll() {
  
  const [scrollY, setScrollY] = useState(0);
  const listener = (e:any) => {
    
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
  };
}