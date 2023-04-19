import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import Timer from "../Components/Timer.tsx";
import App from "../App.jsx";

describe("<Timer/>", () => {

  beforeEach(async () => {
    const app = await render(
      <React.StrictMode>
      <App />
      </React.StrictMode>,
    );
  });

  test("the page loads with a timer", () => {
    screen.getByRole('div', {name: 'timer'})
  })
})