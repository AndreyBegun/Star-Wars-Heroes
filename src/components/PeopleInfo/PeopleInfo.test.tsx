import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PeopleInfo from './PeopleInfo';

// Manually mock Axios
jest.mock('axios');
const mAxiosGet = jest.mocked(axios.get);
const mockResponse = {
    data: {
        name: 'Name',
        skin_color: 'Skin Color',
        gender: 'Gender',
        eye_color: 'Eye Color',
        mass: 'Weight',
        height: 'Height',
    },
}

describe('PeopleInfo Component', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('renders loader while fetching data', async () => {
        // Manually mocking Axios response
        mAxiosGet.mockImplementation(() => Promise.resolve(mockResponse))



        render(
            <MemoryRouter initialEntries={['/people/1']}>
                <Routes>
                    <Route path="/people/:id" element={<PeopleInfo />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('loader-backdrop')).toBeInTheDocument();

        // Use findByTestId to wait for the data to be loaded
        await screen.findByTestId('people-info');
    });

    it('renders PeopleInfo component with correct data', async () => {
        // Manually mocking Axios response
        mAxiosGet.mockImplementation(() => Promise.resolve(mockResponse))

        render(
            <MemoryRouter initialEntries={['/people/1']}>
                <Routes>
                    <Route path="/people/:id" element={<PeopleInfo />} />
                </Routes>
            </MemoryRouter>
        );

        // Use findByTestId to wait for the data to be loaded
        const peopleInfo = await screen.findByTestId('people-info');

        // Check if specific text is present
        expect(peopleInfo).toHaveTextContent('Name');
        expect(peopleInfo).toHaveTextContent('Skin Color');
        expect(peopleInfo).toHaveTextContent('Gender');
        expect(peopleInfo).toHaveTextContent('Eye Color');
        expect(peopleInfo).toHaveTextContent('Weight');
        expect(peopleInfo).toHaveTextContent('Height');
    });
});
