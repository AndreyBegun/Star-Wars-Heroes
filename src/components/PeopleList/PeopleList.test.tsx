import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PeopleList from './PeopleList';

// Manually mock Axios
jest.mock('axios');
const mAxiosGet = jest.mocked(axios.get);

describe('PeopleList Component', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('renders loader while fetching data', async () => {
        // Manually mocking Axios response
        mAxiosGet.mockImplementation(() => Promise.resolve({
            data: {
                results: [],
                next: null,
                previous: null,
            },
        }));

        render(
            <MemoryRouter>
                <PeopleList />
            </MemoryRouter>
        );

        expect(screen.getByTestId('loader-backdrop')).toBeInTheDocument();

        // Use findByTestId to wait for the data to be loaded
        await screen.findByTestId('people-list');
    });

    it('renders table with correct data', async () => {
        // Manually mocking Axios response
        const mockData = {
            results: [
                {
                    name: 'Name',
                    skin_color: 'Skin Color',
                    gender: 'Gender',
                    eye_color: 'Eye Color',
                    mass: 'Weight',
                    height: 'Height',
                    url: 'https://example.com/people/1/',
                },
            ],
            next: null,
            previous: null,
        };

        mAxiosGet.mockImplementation(() => Promise.resolve({ data: mockData }));

        render(
            <MemoryRouter>
                <PeopleList />
            </MemoryRouter>
        );

        // Use findByTestId to wait for the data to be loaded
        await screen.findByTestId('people-list');

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Skin')).toBeInTheDocument();
        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByText('Eye')).toBeInTheDocument();
        expect(screen.getByText('Weight')).toBeInTheDocument();
        expect(screen.getByText('Height')).toBeInTheDocument();
    });

});
