import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RateUs from '../RateUs';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('RateUs component', () => {
  test('renders heading, stars, textarea, and submit button', () => {
    render(<RateUs />);

    // Heading
    expect(screen.getByRole('heading', { name: /rate your experience/i })).toBeInTheDocument();

    // Stars
    expect(screen.getAllByText('★')).toHaveLength(5);

    // Feedback textarea
    expect(screen.getByPlaceholderText(/share your suggestions/i)).toBeInTheDocument();

    // Submit button
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
  });

  test('user can select a star rating', () => {
    render(<RateUs />);

    const stars = screen.getAllByText('★');
    expect(stars).toHaveLength(5);

    // Click the 4th star
    fireEvent.click(stars[3]);

    // It should have "filled" class now
    expect(stars[3].classList.contains('filled')).toBe(true);
  });

  test('user can type feedback', () => {
    render(<RateUs />);

    const textarea = screen.getByPlaceholderText(/share your suggestions/i);
    fireEvent.change(textarea, { target: { value: 'Great app!' } });
    expect(textarea.value).toBe('Great app!');
  });

  test('submits the form and shows thank you message', async () => {
    render(<RateUs />);

    // Select a rating
    const stars = screen.getAllByText('★');
    fireEvent.click(stars[4]); // 5-star rating

    // Type feedback
    const textarea = screen.getByPlaceholderText(/share your suggestions/i);
    fireEvent.change(textarea, { target: { value: 'Excellent work!' } });

    // Click submit
    const submitButton = screen.getByRole('button', { name: /submit feedback/i });
    fireEvent.click(submitButton);

    // Loading state
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/sending/i);

    // Wait for thank-you message
    await waitFor(() =>
      expect(screen.getByText(/thanks for your feedback/i)).toBeInTheDocument()
    );

    // Ensure fetch was called with correct data
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toMatch(/\/api\/rating/);
  });
});
