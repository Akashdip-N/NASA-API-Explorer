import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactUs from '../ContactUs';

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

describe('ContactUs component', () => {
  test('renders heading and form fields', () => {
    render(<ContactUs />);
    
    // Heading
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();

    // Intro message
    expect(screen.getByText(/have questions, feedback, or just want to say hello/i)).toBeInTheDocument();

    // Inputs
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();

    // Button
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('allows user to type into fields', () => {
    render(<ContactUs />);

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/your email/i);
    const messageInput = screen.getByPlaceholderText(/your message/i);

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello there!' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
    expect(messageInput.value).toBe('Hello there!');
  });

  test('submits form and shows success message', async () => {
    render(<ContactUs />);

    // Fill in form
    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByPlaceholderText(/your email/i), { target: { value: 'bob@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: 'Test message' } });

    // Click submit
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Should be disabled and show loading
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/sending/i);

    // Wait for thank-you message
    await waitFor(() =>
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    );

    // Check fetch called with correct data
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toMatch(/\/api\/contact/);
  });
});
