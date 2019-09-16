// Test away
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";

import Controls from './Controls';


test('Dashboard renders without crashing', () => {
  render(<Controls />);
});

test('Matches snapshot', () => {
    const tree = renderer.create(<Controls />); 
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Controls element provide buttons to toggle the closed and locked states', () => {

    const { getByTestId } = render(<Controls />);
    getByTestId(/control-btn1/i);
    getByTestId(/control-btn2/i);
});

test('Buttons text changes to reflect the state the door will be in if clicked', () => {

    const { getByTestId, queryByText } = render(<Controls />);
    const lock = queryByText(/Lock Gate/i);
    fireEvent.click(getByTestId(/control-btn2/i));
    expect(queryByText(/Unlock Gate/i)).toBeTruthy;

});