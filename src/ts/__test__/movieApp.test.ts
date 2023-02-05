/** 
 * @jest-environment jsdom
*/
import { IMovie } from '../models/IMovie';
import { testData } from '../dataArrayMock';
import * as movieApp from '../movieApp'
import { getData } from '../services/movieservice';

beforeEach(() => {
    document.body.innerHTML = ``;
});

jest.mock('../services/movieservice');

describe('Test init', () => {

    test('Check handleSubmit()', () => {

        document.body.innerHTML =
            `<form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
            </form>`
        let spyOnHandleSubmit = jest.spyOn(movieApp, 'handleSubmit').mockReturnValue(new Promise<void>((resolve) => {
            resolve();
        }));

        movieApp.init();
        (document.getElementById('searchForm') as HTMLFormElement).submit();

        expect(spyOnHandleSubmit).toHaveBeenCalled();
        spyOnHandleSubmit.mockRestore();
    });
});

describe('Test handleSubmit', () => {

    test('Collect data and call createHtml', async () => {

        //Arrange
        let movies: IMovie[] = [];

        document.body.innerHTML =
            `<form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
            </form>
            <div id="movie-container"></div>`

        let searchText = (document.getElementById("searchText") as HTMLInputElement).value = 'test';
        let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;

        let spyOnCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

        //Act
        await movieApp.handleSubmit()
        movies = await getData(searchText);

        let foundContainer = document.getElementsByClassName('movies');

        //Assert
        expect(movies.length).toBe(4);
        expect(spyOnCreateHtml).toHaveBeenCalled();
        expect(spyOnCreateHtml).toBeCalledWith(movies, container);
        expect(foundContainer).toBeTruthy();


        spyOnCreateHtml.mockRestore();

    });

    test('Call displayNoResults if movies.length <= 0', async () => {

        //Arrange
        let movies: IMovie[] = [];

        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `

        let searchText = (document.getElementById("searchText") as HTMLInputElement).value = '';
        let spyOnDisplayNoResults = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        //Act
        await movieApp.handleSubmit();

        //Assert
        expect(spyOnDisplayNoResults).toHaveBeenCalled();
        spyOnDisplayNoResults.mockRestore();
    });

    test('Error and call displayNoResult', async () => {

        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `

        let searchText = (document.getElementById("searchText") as HTMLInputElement).value = 'error';

        let spyOnDisplayNoResults = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        //Act
        await movieApp.handleSubmit();

        //Assert
        expect(spyOnDisplayNoResults).toHaveBeenCalled();

        spyOnDisplayNoResults.mockRestore();

    });
});

describe('Testing createHtml', () => {

    test('Create html', () => {

        //Arrange
        document.body.innerHTML = `
        <div id="movie-container"></div>
        `
        let container = document.getElementById('movie-container') as HTMLDivElement;
        //Act
        movieApp.createHtml(testData, container);
        //Assert
        let titleCheck = container.firstChild?.firstChild?.textContent;
        let check = document.getElementsByClassName('movie');
        expect(container.innerHTML).toContain('h3');
        expect(container.innerHTML).toContain('img');
        expect(check).toBeTruthy();
        expect(titleCheck).toContain('B');
    });

});

describe('Test displayNoResult', () => {

    test('Create display noMessage', () => {

        //Arrange
        document.body.innerHTML = `<div id="movie-container"></div>`

        let container = document.getElementById('movie-container') as HTMLDivElement;

        //Act
        movieApp.displayNoResult(container);

        let assert = container.firstChild?.textContent

        //Assert
        expect(container.innerHTML).toContain('p');
        expect(assert).toBe('Inga sökresultat att visa');
    });
});