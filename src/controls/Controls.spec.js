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

test('Buttons text changes to reflect the state the door will be in if clicked [Unlock Gate : Lock Gate]', () => {

    const toggleLocked = jest.fn();
    const { getByTestId } = render(<Controls toggleLocked={toggleLocked} locked={true} closed={true} />);
    const lockBtn = getByTestId(/control-btn1/i);

    fireEvent.click(lockBtn);
    expect(toggleLocked).toHaveBeenCalled();
});

test('[Close] toggle button is not active if gate is locked', () => {

    const toggleClosed = jest.fn();
    const { getByTestId } = render(<Controls toggleClosed={toggleClosed} locked={true} closed={true} />);
    const closeBtn = getByTestId(/control-btn2/i);

    fireEvent.click(closeBtn);
    expect(toggleClosed).not.toHaveBeenCalled();
});

test('[Lock] toggle button is active if gate is open', () => {
    
    const toggleLocked = jest.fn();
    const { getByTestId } = render(<Controls toggleLocked={toggleLocked} closed={false} locked={false} />);
    const lockBtn = getByTestId(/control-btn1/i);

    fireEvent.click(lockBtn);
    expect(toggleLocked).not.toHaveBeenCalled();
});