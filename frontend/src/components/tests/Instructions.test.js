import React from 'react';
import { render, screen } from '@testing-library/react';
import Instructions from '../Instructions';

describe('Instructions component', () => {
  test('renders without crashing', () => {
    render(<Instructions darkMode={false} />);
  });

  test('renders heading', () => {
    render(<Instructions darkMode={false} />);
    expect(screen.getByRole('heading', { name: /welcome to the nasa data explorer/i })).toBeInTheDocument();
  });

  test('renders all instruction list items', () => {
    render(<Instructions darkMode={false} />);
    expect(screen.getByText(/to fetch real-time data directly from NASA’s open data portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Visit the.*section to explore/i)).toBeInTheDocument();
    expect(screen.getByText(/each api includes/i)).toBeInTheDocument();
    expect(screen.getByText(/some apis require/i)).toBeInTheDocument();
    expect(screen.getByText(/need help/i)).toBeInTheDocument();
    expect(screen.getByText(/before leaving/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /playground/i })).toHaveAttribute('href', '#playground');
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '#contact_us');
    expect(screen.getByRole('link', { name: /rate your experience/i })).toHaveAttribute('href', '#rateus');
  });

  test('renders links with correct hrefs', () => {
    render(<Instructions darkMode={false} />);
    expect(screen.getByRole('link', { name: /playground/i })).toHaveAttribute('href', '#playground');
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '#contact_us');
    expect(screen.getByRole('link', { name: /rate your experience/i })).toHaveAttribute('href', '#rateus');
  });

  test('renders correct image in light mode', () => {
    render(<Instructions darkMode={false} />);
    const img = screen.getByAltText(/nasa themed artwork/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/nasa_light_mode\.jpg$/);
  });

  test('renders correct image in dark mode', () => {
    render(<Instructions darkMode={true} />);
    const img = screen.getByAltText(/nasa themed artwork/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/nasa_dark_mode\.jpg$/);
  });

  test('renders important and note paragraphs', () => {
    render(<Instructions darkMode={false} />);
    expect(screen.getByText(/important:/i)).toBeInTheDocument();
    expect(screen.getByText(/note:/i)).toBeInTheDocument();
    expect(screen.getByText(/enjoy your journey/i)).toBeInTheDocument();
  });
});
