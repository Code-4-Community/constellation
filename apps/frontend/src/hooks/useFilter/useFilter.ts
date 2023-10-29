import { useState, useEffect } from 'react';

type FilterFunction<T> = (item: T, searchTerm: string) => boolean;

export const useFilter = <T>(initialData: T[], filterFunction: FilterFunction<T>) => {
    const [filteredData, setFilteredData] = useState<T[]>(initialData);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const filteredData = initialData.filter(item => filterFunction(item, searchTerm));
        setFilteredData(filteredData);
    }, [initialData, filterFunction, searchTerm]);

    return { filteredData, setSearchTerm };
}