import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchField from './SearchField';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('SearchField Component', () => {
    act(() => {
        jest.runAllTimers();
    });
    it('triggers search when the input value changes', async () => {
        const onSearchMock = jest.fn();

        render(<SearchField onSearch={onSearchMock} />);

        const searchInput = screen.getByPlaceholderText('Search…');

        userEvent.type(searchInput, 'Luke');


        // Wait for the debounce to be invoked
        await waitFor(() => {
            expect(onSearchMock).toHaveBeenCalledWith('Luke');
        });
    });
    it('debounces search input changes', async () => {
        const onSearchMock = jest.fn();

        render(<SearchField onSearch={onSearchMock} />);

        const searchInput = screen.getByPlaceholderText('Search…');

        // Trigger multiple changes quickly
        userEvent.type(searchInput, 'Luke');
        userEvent.clear(searchInput)
        userEvent.type(searchInput, 'Leia');
        userEvent.clear(searchInput)
        userEvent.type(searchInput, 'Han');

        // Wait for the debounce
        await waitFor(() => {
            // Expect only the last value to be called due to debounce
            expect(onSearchMock).toHaveBeenCalledWith('Han');
        });
    });
});

