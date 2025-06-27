import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Optional: mock your custom hook if needed
jest.mock('./components/ViewModeToggle.js', () => () => [false, jest.fn()]);

describe('App component', () => {
  test('renders TopNav, Instructions, Playground, RateUs, ContactUs, and Footer', () => {
    render(<App />);
  });
});
