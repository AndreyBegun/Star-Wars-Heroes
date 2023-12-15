import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader', () => {
    it('renders correctly when isLoading is true', async () => {
        render(<Loader isLoading={true} />);

        // Wait for Backdrop to be rendered
        await waitFor(() => {
            expect(screen.getByTestId('loader-backdrop')).toBeInTheDocument();
        });

        // Wait for CircularProgress to be rendered
        await waitFor(() => {
            expect(screen.getByTestId('loader-circular-progress')).toBeInTheDocument();
        });
    });

    it('does not render when isLoading is false', () => {
        render(<Loader isLoading={false} />);

        // Check if the backdrop element is not present
        const backdrop = screen.queryByTestId('loader-backdrop');


        // If the backdrop is present but not visible (opacity: 0 and visibility: hidden)
        expect(backdrop).toHaveStyle({
            opacity: '0',
            visibility: 'hidden',
        });

        // Check if the circular progress element is not present
        const circularProgress = screen.queryByTestId('loader-circular-progress');
        expect(circularProgress).toHaveStyle({
            visibility: 'hidden',
        });
    });

    it('applies the correct styles', async () => {
        render(<Loader isLoading={true} />);

        // Wait for Backdrop to be rendered
        await waitFor(() => {
            // Check if Backdrop has the correct color style
            expect(screen.getByTestId('loader-backdrop')).toHaveStyle({ color: '#fff' });
        });
    });
});
