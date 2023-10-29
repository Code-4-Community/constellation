import { useState, useEffect } from 'react';
import {SortOrder } from '../../enums/SortOrder';


export const useSort = <T>(initialData: T[], compareFunction: (a: T, b: T) => number) => {
    const [sortedData, setSortedData] = useState<T[]>(initialData);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

    useEffect(() => {
        const sortedData = [...initialData].sort(compareFunction);
        if (sortOrder === SortOrder.DESC) {
            sortedData.reverse();
        }
        setSortedData(sortedData);
    }, [initialData, compareFunction, sortOrder]);

    return {sortedData, setSortOrder};
}
