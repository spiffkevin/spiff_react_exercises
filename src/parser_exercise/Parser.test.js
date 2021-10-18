import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import Parser from './Parser';

describe('Parser component', () => {
  beforeEach(() => {
    render(<Parser />);
  });

  afterEach(() => {
    cleanup();
  });

  test('it should display parse and reset buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  test('it should parse strings', () => {
    const input = screen.getByLabelText('Phrase');
    fireEvent.change(input, { target: { value: 'this is a test' } });
    expect(input.value).toBe('this is a test');

    fireEvent.click(screen.getByText('Parse'));
    expect(screen.getByText('a: 1'));
    expect(screen.getByText('t: 2'));
  });

  test('it should parse empty strings', () => {
    fireEvent.click(screen.getByText('Parse'));
    expect(screen.getByText('a: 0'));
  });

  test('it should reset', () => {
    const input = screen.getByLabelText('Phrase');
    fireEvent.change(input, { target: { value: 'this is a test' } });
    expect(input.value).toBe('this is a test');

    fireEvent.click(screen.getByText('Parse'));
    expect(screen.getByText('a: 1'));

    fireEvent.click(screen.getByText('Reset'));
    expect(input.value).toBe('');
    expect(screen.queryByText('a: 0')).toBe(null);
  });
});
