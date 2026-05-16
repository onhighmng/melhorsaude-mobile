import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
// DISABLED: import from 'react-router-dom';
import { vi } from 'vitest';

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
}

/**
 * Wait for a condition to be true
 */
export const waitFor = async (
  condition: () => boolean,
  timeout = 1000,
  interval = 50
): Promise<void> => {
  const startTime = Date.now();
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

/**
 * Create a mock function that returns a promise
 */
export const createAsyncMock = <T,>(resolvedValue: T) => {
  return vi.fn().mockResolvedValue(resolvedValue);
};

/**
 * Create a mock function that rejects with an error
 */
export const createAsyncErrorMock = (error: Error) => {
  return vi.fn().mockRejectedValue(error);
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
