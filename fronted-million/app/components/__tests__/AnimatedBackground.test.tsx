import { render } from '@testing-library/react';
import AnimatedBackground from '../AnimatedBackground';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}));

describe('AnimatedBackground', () => {
  it('should render without crashing', () => {
    render(<AnimatedBackground />);
  });

  it('should have fixed background style', () => {
    const { container } = render(<AnimatedBackground />);
    const background = container.firstChild;
    expect(background).toHaveClass('fixed', 'inset-0');
  });
});

