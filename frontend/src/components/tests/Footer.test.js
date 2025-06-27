import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer component', () => {
  let setDarkModeMock;

  beforeEach(() => {
    setDarkModeMock = jest.fn();
  });

  test('renders logo and brand text', () => {
    render(<Footer darkMode={false} setDarkMode={setDarkModeMock} />);
    expect(screen.getByAltText(/logo_footer/i)).toBeInTheDocument();  // Alt text if defined
    expect(screen.getByText(/data explorer/i)).toBeInTheDocument();
  });

  test('renders dark mode label correctly in light mode', () => {
    render(<Footer darkMode={false} setDarkMode={setDarkModeMock} />);
    expect(screen.getByText(/☀️ Light Mode/i)).toBeInTheDocument();
  });

  test('renders dark mode label correctly in dark mode', () => {
    render(<Footer darkMode={true} setDarkMode={setDarkModeMock} />);
    expect(screen.getByText(/🌙 Dark Mode/i)).toBeInTheDocument();
  });

  test('toggle checkbox is checked when darkMode is true', () => {
    render(<Footer darkMode={true} setDarkMode={setDarkModeMock} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('toggle checkbox is unchecked when darkMode is false', () => {
    render(<Footer darkMode={false} setDarkMode={setDarkModeMock} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('calls setDarkMode when toggled', () => {
    render(<Footer darkMode={false} setDarkMode={setDarkModeMock} />);
    const toggle = screen.getByRole('checkbox');
    fireEvent.click(toggle);
    expect(setDarkModeMock).toHaveBeenCalledWith(true);
  });

  test('renders all social media links', () => {
    render(<Footer darkMode={false} setDarkMode={setDarkModeMock} />);

    expect(screen.getByRole('link', { name: /facebook/i }))
      .toHaveAttribute('href', expect.stringContaining('facebook.com'));
    expect(screen.getByRole('link', { name: /twitter/i }))
      .toHaveAttribute('href', expect.stringContaining('twitter.com'));
    expect(screen.getByRole('link', { name: /instagram/i }))
      .toHaveAttribute('href', expect.stringContaining('instagram.com'));
    expect(screen.getByRole('link', { name: /linkedin/i }))
      .toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });
});
