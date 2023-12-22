import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination', () => {
    it('renders the previous and next buttons correctly', () => {
        const previous = '/previous';
        const next = '/next';
        const onButtonClick = jest.fn();

        render(<Pagination previous={previous} next={next} onButtonClick={onButtonClick} />);

        // Check if the previous button is rendered and enabled
        const previousButton = screen.getByText('previous page');
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).not.toBeDisabled();

        // Check if the next button is rendered and enabled
        const nextButton = screen.getByText('next page');
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).not.toBeDisabled();
    });

    it('disables the previous button when previous is null', () => {
        const next = '/next';
        const onButtonClick = jest.fn();

        render(<Pagination previous={null} next={next} onButtonClick={onButtonClick} />);

        // Check if the previous button is rendered and disabled
        const previousButton = screen.getByText('previous page');
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).toBeDisabled();

        // Check if the next button is rendered and enabled
        const nextButton = screen.getByText('next page');
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).not.toBeDisabled();
    });

    it('disables the next button when next is null', () => {
        const previous = '/previous';
        const onButtonClick = jest.fn();

        render(<Pagination previous={previous} next={null} onButtonClick={onButtonClick} />);

        // Check if the previous button is rendered and enabled
        const previousButton = screen.getByText('previous page');
        expect(previousButton).toBeInTheDocument();
        expect(previousButton).not.toBeDisabled();

        // Check if the next button is rendered and disabled
        const nextButton = screen.getByText('next page');
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();
    });

    it('calls onButtonClick with the correct URL when buttons are clicked', () => {
        const previous = '/people/?search=&page=1';
        const next = '/people/?search=&page=2';
        const onButtonClick = jest.fn();

        render(<Pagination previous={previous} next={next} onButtonClick={onButtonClick} />);

        // Click the previous button
        fireEvent.click(screen.getByText('previous page'));
        expect(onButtonClick).toHaveBeenCalledWith('1');

        // Click the next button
        fireEvent.click(screen.getByText('next page'));
        expect(onButtonClick).toHaveBeenCalledWith('2');
    });
});
