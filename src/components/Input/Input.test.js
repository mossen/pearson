import React from 'react';
import { render } from '@testing-library/react';
import Input from './index';

test('renders input', () => {
  const { getByTestId } = render(<Input />);
  const canvas = getByTestId("input");
  expect(canvas).toBeInTheDocument();
});
