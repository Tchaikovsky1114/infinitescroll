import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { fetchAllStore } from '../api';
import { ChangeNavigationStyle } from './atom';
import TopNavigation from './TopNavigation';

const Search = () => {
    const [changeNavigationStyle, setChangeNavigationStyle] = useRecoilState(ChangeNavigationStyle);
    
    return (
        <div>
            <TopNavigation/>
        </div>
    );
};

export default Search;