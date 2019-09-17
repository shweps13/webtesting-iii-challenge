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

test('Defaults to unlocked and open', () => {
    
    const { getByText } = render(<Dashboard />);
    getByText(/unlocked/i);
    getByText(/open/i);
})

test('Cannot open if locked', () => {

    const { getByTestId, getByText } = render(<Dashboard />);

    fireEvent.click(getByTestId(/control-btn2/i));
    fireEvent.click(getByTestId(/control-btn1/i));
    const inActiveOpen = getByText(/closed/i);
    fireEvent.click(getByTestId(/control-btn2/i));
    const checkChange = getByText(/closed/i);

    expect(inActiveOpen).toBe(checkChange);
}) 