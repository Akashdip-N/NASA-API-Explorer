import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        title: 'Mocked Title',
        url: 'https://example.com/image.jpg',
        media_type: 'image',
        explanation: 'Mocked explanation of the APOD.',
        date: '2025-06-10',
        hdurl: 'https://example.com/hd-image.jpg',
      }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders heading and dropdown', () => {
  render(<App />);
  expect(screen.getByText(/NASA Data Explorer/i)).toBeInTheDocument();
  expect(screen.getByText(/Choose from the following options/i)).toBeInTheDocument();
});

test('fetches and displays APOD data on button click', async () => {
  render(<App />);
  const button = screen.getByText(/See Results/i);
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Title: Mocked Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked explanation/i)).toBeInTheDocument();
    expect(screen.getByText(/View Image in HD/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 2025-06-10/i)).toBeInTheDocument();
  });
});

test('toggles dark mode slider', () => {
  render(<App />);
  const toggleLabel = screen.getByText(/Light Mode/i);
  const checkbox = screen.getByRole('checkbox');

  expect(toggleLabel).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
});
