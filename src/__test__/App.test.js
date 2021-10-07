import 'regenerator-runtime/runtime'
import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('<App />', () => {
  const setup = () => {
    const utils = render(<App />);
    const text = utils.queryByText('Hello world!');
    return {
      text,
      ...utils
    }
  }

  it('should render welcome message', () => {
    const app = setup();
    expect(app.getByText('Hello world!')).toBeInTheDocument();
  });
});
