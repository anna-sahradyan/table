import React, {useEffect, useState, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../service/store.ts";
import {fetchSites, fetchTests} from "../../service/slice/thunk.ts";
import {ISite, ITest} from "../../service/slice/type.ts";
import {SearchComponent} from "../search/SearchComponent.tsx";
import style from './dashboard.module.scss';
import {ChevronUpIcon} from "../../assets/icons/ChevronUpIcon.tsx";
import clsx from 'classnames';

export const Dashboard = () => {
    const {tests, sites} = useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [filteredTestsWithSite, setFilteredTestsWithSite] = useState<any[]>([]);
    const [allTestsWithSite, setAllTestsWithSite] = useState<any[]>([]);

    // Состояния для сортировки
    const [sortColumn, setSortColumn] = useState<string | null>('type');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleResultsClick = (testId: number) => {
        navigate(`/results/${testId}`);
    };

    const handleFinalizeClick = (testId: number) => {
        navigate(`/finalize/${testId}`);
    };

    useEffect(() => {
        dispatch(fetchTests());
        dispatch(fetchSites());
    }, [dispatch]);

    useEffect(() => {
        if (sites.length > 0 && tests.length > 0) {
            const testsWithSite = tests.map((test: ITest) => {
                const siteExists = sites.some(site => Number(site.id) === Number(test.siteId));

                if (!siteExists) {
                    console.warn(`Site with id ${test.siteId} does not exist.`);
                    return {...test, siteUrl: ''};
                }

                const site = sites.find((site: ISite) => Number(site.id) === Number(test.siteId));
                return {...test, siteUrl: site ? site?.url.replace(/^https?:\/\//, '').replace(/^www\./, '') : ''};
            });

            setAllTestsWithSite(testsWithSite);
            setFilteredTestsWithSite(testsWithSite);
        }
    }, [tests, sites]);

    const sortData = (data: any[], column: string, direction: 'asc' | 'desc') => {
        return [...data].sort((a, b) => {
            let comparison = 0;
            if (a[column] > b[column]) {
                comparison = 1;
            } else if (a[column] < b[column]) {
                comparison = -1;
            }
            return direction === 'asc' ? comparison : comparison * -1;
        });
    };

    const handleSortClick = (columnName: string) => {
        if (sortColumn === columnName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnName);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        let filteredTests = allTestsWithSite;
        if (searchTerm) {
            filteredTests = allTestsWithSite.filter(test =>
                test.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortColumn) {
            filteredTests = sortData(filteredTests, sortColumn, sortDirection);
        }

        setFilteredTestsWithSite(filteredTests);
    }, [searchTerm, allTestsWithSite, sortColumn, sortDirection]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        const timerId = setTimeout(() => {
            setSearchTerm(value);
        }, 1000);
        return () => clearTimeout(timerId);
    }, []);


    const hasData = filteredTestsWithSite.length > 0;

    return (
        <>
            <div className={style.container}>
                <h1 className={style.title}>Dashboard</h1>
                <SearchComponent
                    searchTerm={inputValue}
                    handleSearchChange={handleSearchChange}
                    testsLength={filteredTestsWithSite.length}
                />

                <div className={style.tableContainer}>
                    {hasData ? (
                        <table  className={style.tableContent}>
                            <thead className={style.rowHead}>
                            <tr>
                                <th className={style.noStyleCell}>Name</th>
                                <th
                                    className={clsx(style.noStyleCell, { [style.sortedColumn]: sortColumn === 'type' })}
                                    onClick={() => handleSortClick('type')}
                                >
                                    Type <ChevronUpIcon className={clsx({ [style.rotateIcon]: sortDirection === 'desc' })} />
                                </th>
                                <th className={style.noStyleCell}>Status</th>
                                <th className={style.noStyleCell}>Site</th>
                            </tr>
                            </thead>
                            <tbody >
                            {filteredTestsWithSite.map((test) => (
                                <tr className={clsx(style.row, {
                                    [style.online]: test.status === 'ONLINE',
                                    [style.stopped]: test.status === 'STOPPED',
                                    [style.draft]: test.status === 'DRAFT',
                                    [style.paused]: test.status === 'PAUSED',
                                })}
                                    key={test.id}

                                >
                                    <th className={style.name}>{test.name}</th>
                                    <td className={clsx(style.type, {[style.isMVT]: test.type === 'MVT'})}>
                                        {test.type}
                                    </td>
                                    <th className={clsx(style.status, {
                                        [style.statusOnline]: test.status === 'ONLINE',
                                        [style.statusStopped]: test.status === 'STOPPED',
                                        [style.statusDraft]: test.status === 'DRAFT',
                                        [style.statusPaused]: test.status === 'PAUSED',
                                    })}>{test.status}</th>
                                    <th className={style.url}>{test.siteUrl}</th>
                                    <th>
                                        {test.status === "STOPPED" && (
                                            <button
                                                className={style.resultsButton}
                                                onClick={() => handleResultsClick(test.id)}>
                                                Results
                                            </button>
                                        )}
                                        {test.status === "DRAFT" && (
                                            <button
                                                className={style.finalizeButton}
                                                onClick={() => handleFinalizeClick(test.id)}>
                                                Finalize
                                            </button>
                                        )}
                                        {test.status === "ONLINE" && (
                                            <button
                                                className={style.resultsButton}
                                                onClick={() => handleResultsClick(test.id)}>
                                                Results
                                            </button>
                                        )}
                                        {test.status === "PAUSED" && (
                                            <button
                                                className={style.resultsButton}
                                                onClick={() => handleResultsClick(test.id)}
                                                style={{marginLeft: "8px"}}
                                            >
                                                Results
                                            </button>
                                        )}
                                    </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={style.emptyContainer}>
                       <p className={style.text}>Your search did not match any results.</p>
                            <div className = {style.btn}>
                                <button className={style.btnReset}>Reset</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
