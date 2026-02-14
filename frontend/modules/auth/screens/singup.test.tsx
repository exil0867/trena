
import {fireEvent, render, waitFor} from "@testing-library/react-native";
import {NavigationContainer} from "@react-navigation/native";
import * as authApi from '../api'
import Signup from "@/modules/auth/screens/signup";


jest.mock('../api', () => {
  return {
    signup: jest.fn()
  }
})


describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const renderScreen = () => render(<NavigationContainer><Signup/></NavigationContainer>)
  const emailPlaceholder = /email/i
  const emailInputValue = 'test@mail.com'
  const usernamePlaceholder = /username/i
  const usernameInputValue = 'test'
  const passwordPlaceholder = /^password$/i
  const passwordInputValue = '123456789'
  const confirmPasswordPlaceholder = /confirm password/i
  it('Renders email and password inputs', () => {
    const { getByPlaceholderText } = renderScreen()

    expect(getByPlaceholderText(emailPlaceholder)).toBeTruthy()
    expect(getByPlaceholderText(passwordPlaceholder)).toBeTruthy()
  })

  it('Calls signup API with correct payload', async () => {
    (authApi.signup as jest.Mock).mockResolvedValue({})

    const { getByPlaceholderText, getByTestId } = renderScreen();

    fireEvent.changeText(getByPlaceholderText(emailPlaceholder), emailInputValue)
    fireEvent.changeText(getByPlaceholderText(usernamePlaceholder), usernameInputValue)
    fireEvent.changeText(getByPlaceholderText(passwordPlaceholder), passwordInputValue)
    fireEvent.changeText(getByPlaceholderText(confirmPasswordPlaceholder), passwordInputValue)

    fireEvent.press(getByTestId('primary-button'))

    await waitFor(() => {
      expect(authApi.signup).toHaveBeenCalledTimes(1)
      expect(authApi.signup).toHaveBeenCalledWith({
        email: emailInputValue,
        username: usernameInputValue,
        password: passwordInputValue,
        confirmPassword: passwordInputValue
      })
    })
  })
})
