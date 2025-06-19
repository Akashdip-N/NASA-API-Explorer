import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(); // mock fetch globally

describe('NASA API Explorer App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders dropdown and fetch button', () => {
    render(<App />);
    expect(screen.getByText(/choose api/i)).toBeInTheDocument();
    expect(screen.getByRole(
      'button',
      { name: /fetch data/i }
    )).toBeInTheDocument();
  });

  test('shows date input for APOD by default', () => {
    render(<App />);
    const dateInput = screen.getByRole('textbox', { name: /date/i });
    expect(dateInput).toBeInTheDocument();
  });

  test('does not show date input for Mars when selected', () => {
    render(<App />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'mars' } });
    expect(screen.queryByLabelText(/date/i)).toBeNull();
  });

  test('makes API call and displays APOD image', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        title: 'Test APOD',
        url: 'https://apod.nasa.gov/apod/image.jpg',
        media_type: 'image',
        explanation: 'Sample explanation',
      }),
    });

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    await waitFor(() => {
      expect(screen.getByText(/test apod/i)).toBeInTheDocument();
      expect(screen.getByAltText(/test apod/i)).toBeInTheDocument();
    });
  });

  test('shows error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API failed'));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    await waitFor(() => {
      expect(screen.getByText(/error fetching data/i)).toBeInTheDocument();
    });
  });
});
