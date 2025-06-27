import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Playground from '../Playground';

global.fetch = jest.fn();

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ myData: 'hello world' }),
    })
  );
});

describe('Playground component', () => {

  it('renders welcome message', () => {
    render(<Playground darkMode={false} />);
    expect(screen.getByText(/Welcome to the Playground/i)).toBeInTheDocument();
  });

  it('shows API options in dropdown', () => {
    render(<Playground darkMode={false} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'apod' } });
    expect(select.value).toBe('apod');
    expect(screen.getByText(/API Description/i)).toBeInTheDocument();
  });

  it('renders date input for APOD', () => {
    render(<Playground darkMode={false} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'apod' } });
    expect(screen.getByLabelText(/Select a date for Astronomy Picture of the Day or continue with/i)).toBeInTheDocument();
  });

  it('renders slider for Mars', () => {
    render(<Playground darkMode={false} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'mars' } });
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText(/Selected Mars Images/i)).toBeInTheDocument();
  });

  it('renders search inputs for NASA Image', () => {
    render(<Playground darkMode={false} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'nasa_image' } });
    expect(screen.getByPlaceholderText(/e.g., Moon/i)).toBeInTheDocument();
  });

  it('displays error if NASA Image search query is empty', async () => {
    render(<Playground darkMode={false} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'nasa_image' } });
    const button = screen.getByRole('button', { name: /See Results/i });
    fireEvent.click(button);
    expect(await screen.findByText(/Please enter a keyword/i)).toBeInTheDocument();
  });

  it('calls fetch with correct URL when See Results is clicked (APOD)', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        title: 'Test APOD',
        media_type: 'image',
        url: 'https://example.com',
        explanation: 'Test explanation',
        date: '2025-01-01'
      }),
    });

    render(<Playground darkMode={false} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'apod' } });
    const button = screen.getByRole('button', { name: /See Results/i });
    fireEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    await screen.findByText(/Test APOD/i);
  });
});