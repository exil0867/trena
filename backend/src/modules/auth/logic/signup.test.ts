import {mock, expect, describe, it, afterEach} from "bun:test"
import {signup} from "./signup.ts";
import {InvalidSignupCredentials} from "./signup.ts";

const mockFindUserByEmail = mock()
const mockCreateUser = mock()
const mockHashPassword = mock()

mock.module("../repo/user.repo.js", () => {
  return {
    findUserByEmail: mockFindUserByEmail,
    createUser: mockCreateUser,
  }
})

mock.module("../impl/password.js", () => {
  return {
    hashPassword: mockHashPassword,
  }
})

afterEach(() => {
  mockFindUserByEmail.mockReset()
  mockCreateUser.mockReset()
  mockHashPassword.mockReset()
})

describe("Signup function", () => {
  const email = 'test@mail.com'
  const username = 'test'
  const password = '123456'
  const passwordHash = 'hashedpassword'
  const userId = '123'
  it("Throws if email already exists", async () => {
    mockFindUserByEmail.mockResolvedValue({id: '123'})
    return expect(signup({
      email,
      username,
      password
    })).rejects.toBeInstanceOf(InvalidSignupCredentials)
  })

  it("Resolves when the email does not exist", async () => {
    mockFindUserByEmail.mockResolvedValue(null)
    mockHashPassword.mockResolvedValue(passwordHash)
    mockCreateUser.mockResolvedValue( userId)
    const user = await signup({
      email,
      username,
      password
    })
    expect(mockFindUserByEmail).toHaveBeenCalledTimes(1)
    expect(mockFindUserByEmail).toHaveBeenCalledWith(email)

    expect(mockHashPassword).toHaveBeenCalledTimes(1)
    expect(mockHashPassword).toHaveBeenCalledWith(password)

    expect(mockCreateUser).toHaveBeenCalledTimes(1)
    expect(mockCreateUser).toHaveBeenCalledWith({email, username, passwordHash})

    expect(user).toBe(userId)
  })
})
