import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenuButton from '../MobileMenuButton';

describe('MobileMenuButton', () => {
  const mockSetSidebarOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <MobileMenuButton
        sidebarOpen={false}
        setSidebarOpen={mockSetSidebarOpen}
      />
    );
  });

  it('should call setSidebarOpen when clicked', () => {
    render(
      <MobileMenuButton
        sidebarOpen={false}
        setSidebarOpen={mockSetSidebarOpen}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(true);
  });

  it('should toggle to close state when sidebar is open', () => {
    render(
      <MobileMenuButton
        sidebarOpen={true}
        setSidebarOpen={mockSetSidebarOpen}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
  });
});

