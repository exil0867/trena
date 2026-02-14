
import {fireEvent, render, waitFor} from "@testing-library/react-native";
import {NavigationContainer} from "@react-navigation/native";
import * as authApi from '../api'
import Login from "@/modules/auth/screens/login";


jest.mock('../api', () => {
  return {
    login: jest.fn()
  }
})


describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const renderScreen = () => render(<NavigationContainer><Login/></NavigationContainer>)
  const emailPlaceholder = /email/i
  const emailInputValue = 'test@mail.com'
  const passwordPlaceholder = /password/i
  const passwordInputValue = '123456'
  it('Renders email and password inputs', () => {
    const { getByPlaceholderText } = renderScreen()

    expect(getByPlaceholderText(emailPlaceholder)).toBeTruthy()
    expect(getByPlaceholderText(passwordPlaceholder)).toBeTruthy()
  })

  it('Calls login API with correct payload', async () => {
    (authApi.login as jest.Mock).mockResolvedValue({ accessToken: 'fake.token' })

    const { getByPlaceholderText, getByTestId } = renderScreen();

    fireEvent.changeText(getByPlaceholderText(emailPlaceholder), emailInputValue)
    fireEvent.changeText(getByPlaceholderText(passwordPlaceholder), passwordInputValue)

    fireEvent.press(getByTestId('primary-button'))

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledTimes(1)
      expect(authApi.login).toHaveBeenCalledWith({
        email: emailInputValue,
        password: passwordInputValue
      })
    })
  })
})
