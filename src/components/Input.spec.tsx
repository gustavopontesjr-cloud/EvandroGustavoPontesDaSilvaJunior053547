import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect } from 'vitest';

describe('Input Component', () => {
  
  it('should render the label correctly', () => {
    render(<Input label="User Email" />);
    expect(screen.getByText('User Email')).toBeInTheDocument();
  });

  it('should display the placeholder', () => {
    render(<Input label="Test" placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });
});