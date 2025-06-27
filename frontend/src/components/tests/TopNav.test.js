import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopNav from '../TopNav';

describe('TopNav component', () => {
  test('renders without crashing', () => {
    render(<TopNav />);
  });

  test('renders logo image and heading', () => {
    render(<TopNav />);
    // Check for the logo image by alt text
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

    // Check for heading text
    expect(screen.getByText(/data explorer/i)).toBeInTheDocument();
  });

  test('renders nav links', () => {
    render(<TopNav />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /playground/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /rate us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
  });

  test('closes menu when a nav link is clicked', () => {
    render(<TopNav />);
    const hamburgerDiv = screen.getByText((content, element) => {
      return element?.classList.contains('hamburger');
    });
    fireEvent.click(hamburgerDiv);
    expect(document.querySelector('.nav-links.open')).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    expect(document.querySelector('.nav-links.open')).not.toBeInTheDocument();
  });
});
