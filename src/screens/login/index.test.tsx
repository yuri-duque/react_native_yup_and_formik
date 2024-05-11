import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {Login} from './index';

describe('Login component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('should submit when set cpf and password', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<Login />);

    const cpfInput = getByPlaceholderText('CPF');
    fireEvent.changeText(cpfInput, '1234');

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, '@#23CIan');

    const loginButton = getByText('Submit');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const successMessage = queryByText('Success');
      expect(successMessage).toBeTruthy();
    });
  });

  it('should submit when set cpf as 123, email and password', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<Login />);

    const cpfInput = getByPlaceholderText('CPF');
    fireEvent.changeText(cpfInput, '123');

    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'yurithielmann83@gmail.com');

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, '12345678');

    const loginButton = getByText('Submit');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const successMessage = queryByText('Success');
      expect(successMessage).toBeTruthy();
    });
  });

  it('should return error when not set cpf', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<Login />);

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, '@#23CIan');

    const loginButton = getByText('Submit');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = queryByText('CPF is required');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should return error when not set password', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<Login />);

    const cpfInput = getByPlaceholderText('CPF');
    fireEvent.changeText(cpfInput, '1234');

    const loginButton = getByText('Submit');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = queryByText('Password is required');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should return error when password is less than 8 caracters', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<Login />);

    const cpfInput = getByPlaceholderText('CPF');
    fireEvent.changeText(cpfInput, '1234');

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, '1234567');

    const loginButton = getByText('Submit');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = queryByText(
        'Password must be at least 8 characters'
      );
      expect(errorMessage).toBeTruthy();
    });
  });

  it('should return error when set cpf as 123 and not set email', async () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<Login />);

    const cpfInput = getByPlaceholderText('CPF');
    fireEvent.changeText(cpfInput, '123');

    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, '12345678');

    const loginButton = getByText('Submit');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = queryByText('Email is required');
      expect(errorMessage).toBeTruthy();
    });
  });
});
