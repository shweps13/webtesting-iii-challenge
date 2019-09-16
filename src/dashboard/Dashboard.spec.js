// Test away
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from './Dashboard';
import { Display } from '../display/Display';
import { Controls } from '../controls/Controls';

test('Dashboard renders without crashing', () => {
  render(<Dashboard />);
});

test('Display element showings on Dashboard page', () => {

    const { getByTestId } = render(<Dashboard />);
    getByTestId(/display-element/i);
  });
 
test('Controls element showings on Dashboard page', () => {

    const { getByTestId } = render(<Dashboard />);
    getByTestId(/controls-element/i);
});