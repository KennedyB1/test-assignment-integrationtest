import { IMovie } from '../../models/IMovie';
import { testData } from '../../dataArrayMock';

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        if(searchText === '') {
            resolve([]);
        }
        if(searchText !== 'error') {
            resolve(testData);
        } else {
            reject([]);
        }

    });
};
