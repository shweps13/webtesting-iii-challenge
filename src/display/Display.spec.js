// Test away!// Test away
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";

import Display from './Display';


test('Dashboard renders without crashing', () => {
  render(<Display />);
});

test('Matches snapshot', () => {
    const tree = renderer.create(<Display />); 
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Display [open/unlocked] by default', () => {
    const { queryByText } = render(<Display />);
    expect(queryByText(/Open/i)).toBeTruthy();
    expect(queryByText(/Unlocked/i)).toBeTruthy();
})

test('Display "Closed" if closed prop is true', () => {
    const { getByText } = render(<Display closed={true} />);
    expect(getByText('Closed'));
})

test('Display "Locked" if locked prop is true', () => {
    const { getByText } = render(<Display locked={true} />);
    expect(getByText('Locked'));
})

test('Displays "Open" if closed prop is false', () => {
    const { getByText } = render(<Display closed={false} />);
    getByText(/open/i);
});

test('Displays "Unlock" if locked prop is false', () => {
    const { getByText } = render(<Display locked={false} />);
    getByText(/unlocked/i);
});

test('When locked or closed use the red-led class', () => {
    const { getByText } = render(<Display closed={true} locked={true} />);
    expect(getByText(/locked/i).classList).toContain('red-led');
    expect(getByText(/closed/i).classList).toContain('red-led');
});

test('When unlocked or open use the green-led class', () => {
    const { getByText } = render(<Display closed={false} locked={false} />);
    const unlocked = getByText(/unlocked/i);
    const open = getByText(/open/i);
    expect(unlocked.classList).toContain('green-led');
    expect(open.classList).toContain('green-led');
});