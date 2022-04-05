
import { atom } from 'recoil';


export const ChangeNavigationStyle = atom({
    key: 'navigationStyle',
    default: true
})

export const searchInputValue = atom({
    key: 'searchInputValue',
    default:''
})

export const saveInputValue = atom({
    key: 'saveInputValue',
    default:[]
})

export const sortedSearchingStore = atom({
    key: 'sorted',
    default:[]
})