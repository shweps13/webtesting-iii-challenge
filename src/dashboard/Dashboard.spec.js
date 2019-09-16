// Test away
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";

import Dashboard from './Dashboard';


test('Dashboard renders without crashing', () => {
  render(<Dashboard />);
});

test('Matches snapshot', () => {
    const tree = renderer.create(<Dashboard />); 
    expect(tree.toJSON()).toMatchSnapshot();
  });

test('Display element showings on Dashboard page', () => {

    const { getByTestId } = render(<Dashboard />);
    getByTestId(/display-element/i);
  });
 
test('Controls element showings on Dashboard page', () => {

    const { getByTestId } = render(<Dashboard />);
    getByTestId(/controls-element/i);
});

test('Showing [open/close] when click on it', () => {

    const { getByTestId, queryByText } = render(<Dashboard />);
    expect(queryByText(/Open/i)).toBeTruthy();
    fireEvent.click(getByTestId(/control-btn2/i));
    expect(queryByText(/Closed/i)).toBeTruthy();
});