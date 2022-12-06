import { it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CountDownTimer from './Timer';
/**
* @vitest-environment jsdom
*/



it('when the state is changed in timer, the time and text changes in timer object', async () => {
    
    // expect(useDbData).toHaveBeenCalled();
    render(<CountDownTimer hoursMinSecs={"2055-04-24T15:33:30.000Z"} state={1}/>);
    await screen.getByText(/hide/i);
    render(<CountDownTimer hoursMinSecs={"2055-04-24T15:33:30.000Z"} state={3}/>);
    await screen.getByText(/seek/i);
  });