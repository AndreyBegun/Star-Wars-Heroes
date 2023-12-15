import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditableTextField from './EditableTextField';
import userEvent from '@testing-library/user-event';

describe('EditableTextField', () => {
    it('renders correctly with title and value', () => {
        const title = 'Test Title';
        const value = 'Test Value';

        render(<EditableTextField title={title} value={value} />);

        // Check if title and value are rendered
        expect(screen.getByText(`${title} :`)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('switches to edit mode on click', () => {
        const title = 'Test Title';
        const value = 'Test Value';

        render(<EditableTextField title={title} value={value} />);

        const textField = screen.getByText(value);
        fireEvent.click(textField);

        // Check if Input is rendered in edit mode
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('updates text when typing in edit mode', () => {
        const title = 'Test Title';
        const value = 'Test Value';

        render(<EditableTextField title={title} value={value} />);

        const textField = screen.getByText(value);
        fireEvent.click(textField);

        const newText = 'New Text';
        fireEvent.change(screen.getByRole('textbox'), { target: { value: newText } });

        // Check if Input has the updated text
        expect(screen.getByRole('textbox')).toHaveValue(newText);
    });

    it('switches back to display mode on click after editing', () => {
        const title = 'Test Title';
        const value = 'Test Value';

        render(<EditableTextField title={title} value={value} />);

        const textField = screen.getByText(value);
        fireEvent.dblClick(textField);

        fireEvent.dblClick(screen.getByText(value));

        // Check if Input is not rendered
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        // Check if display mode is rendered
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('shows correct tooltip message based on edit mode', async () => {
        const title = 'Test Title';
        const value = 'Test Value';

        render(<EditableTextField title={title} value={value} />);

        const textField = screen.getByText(value);
        userEvent.hover(textField);
        await waitFor(() => {
            const tooltip = screen.getByText('Click to Edit');

            // Check if the tooltip initially shows "Click to Edit"
            expect(tooltip).toBeInTheDocument();
        })

        fireEvent.click(screen.getByText(value));

        userEvent.hover(textField);
        await waitFor(() => {
            const tooltip = screen.getByText('Doble-Click to Save');
            // Check if the tooltip now shows "Doble-Click to Save"
            expect(tooltip).toHaveTextContent('Doble-Click to Save');

        })
    });
});
