import React from "react";
import style from './search.module.scss';
import {Search} from "../../assets/icons/Search.tsx";

interface SearchProps {
    searchTerm: string;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    testsLength:number
}

export const SearchComponent: React.FC<SearchProps> = ({searchTerm, handleSearchChange,testsLength}) => {

    return (
        <>
            <div className={style.inputField}>
                <input
                    className={style.mainInput}
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <span className={style.searchIcon}><Search/></span>
                <span className={style.testsLength}>{testsLength} tests</span>
            </div>
        </>
    );
};
