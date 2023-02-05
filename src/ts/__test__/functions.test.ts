import { testData } from "../dataArrayMock";
import { movieSort } from "../functions";


describe("MovieSort", () => {
    test('Sort by title if desc = true', () => {

        let data = testData
        let result = [
            { Title: "A", imdbID: "1111", Type: "Aa", Poster: "Arc", Year: "2030" },
            { Title: "B", imdbID: "2222", Type: "Bb", Poster: "Blue", Year: "2020" },
            { Title: "B", imdbID: "2222", Type: "Bb", Poster: "Blue", Year: "2020" },
            { Title: "C", imdbID: "3333", Type: "Cc", Poster: "Cool", Year: "2040" }
        ];

        movieSort(data);

        expect(movieSort(data, true)).toEqual(result);

    });

    test('Sort by title if desc = false', () => {

        let data = testData
        let result = [
            { Title: "C", imdbID: "3333", Type: "Cc", Poster: "Cool", Year: "2040" },
            { Title: "B", imdbID: "2222", Type: "Bb", Poster: "Blue", Year: "2020" },
            { Title: "B", imdbID: "2222", Type: "Bb", Poster: "Blue", Year: "2020" },
            { Title: "A", imdbID: "1111", Type: "Aa", Poster: "Arc", Year: "2030" },

        ];

        movieSort(data, false);

        expect(movieSort(data, false)).toEqual(result);

    });
});