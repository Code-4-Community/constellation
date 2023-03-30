import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App isPassedToWithAuthenticator={true} />);
    expect(baseElement).toBeTruthy();
  });
});
