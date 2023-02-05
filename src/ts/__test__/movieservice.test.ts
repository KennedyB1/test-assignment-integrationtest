import { testData } from '../dataArrayMock'
import { getData } from '../services/movieservice';

jest.mock('axios', () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if (url.endsWith("error")) {
                reject([]);
            } else {
                resolve({ data: { Search: testData } });
            }
        });
    }
}));


describe('Happy-flow + error in getData', () => {

    test('Collect data correctly', async () => {

        let result = await getData("fejk data");

        expect(result.length).toBe(4);
        expect(result[0].Title).toBe(testData[0].Title);
    });

    test('Not collect data', async () => {

        try {
            let result = await getData("error");
        }
        catch (error: any) {
            expect(error.length).toBe(0);
            expect(error).toReturnWith([]);
        }
    });
});
