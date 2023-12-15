import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('navigates to /people on default route', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('people-list')).toBeInTheDocument();
  });

  it('renders PeopleInfo component on /people/:id route', () => {
    render(
      <MemoryRouter initialEntries={['/people/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('people-info')).toBeInTheDocument();
  });

  it('navigates to /people when clicking on the root element', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const appContainer = screen.getByTestId('app-container');
    userEvent.click(appContainer);

    expect(screen.getByTestId('people-list')).toBeInTheDocument();
  });

});
