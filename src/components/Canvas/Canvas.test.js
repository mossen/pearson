import React from 'react';
import { render } from '@testing-library/react';
import Canvas from './index';

test('renders input', () => {
  const { getByTestId } = render(<Canvas />);
  const canvas = getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
});
