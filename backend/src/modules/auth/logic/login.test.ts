import {mock, expect, describe, it, afterEach} from "bun:test"
import {InvalidLoginCredentials} from "./login.ts";
import {login} from "./login.ts";

const mockFindUserByEmail = mock()
const mockVerifyPassword = mock()
const mockSignToken = mock()

mock.module("../repo/user.repo.js", () => {
  return {
    findUserByEmail: mockFindUserByEmail,
  }
})

mock.module("../impl/password.js", () => {
  return {
    verifyPassword: mockVerifyPassword,
  }
})

mock.module("../impl/jwt.js", () => {
  return {
    signToken: mockSignToken,
  }
})


afterEach(() => {
  mockFindUserByEmail.mockReset()
  mockVerifyPassword.mockReset()
  mockSignToken.mockReset()
})

describe("Login function", () => {
  const email = 'test@mail.com'
  const password = '123456'
  const userId = '123'
  const token = 'fake.token'
  const passwordHash = 'hashedpassword'
  it("Throws if email does not exists", async () => {
    mockFindUserByEmail.mockResolvedValue({id: userId, password_hash: passwordHash})
    mockVerifyPassword.mockResolvedValue(false)
    mockSignToken.mockResolvedValue({sub: userId})
    return expect(login({
      email,
      password
    })).rejects.toBeInstanceOf(InvalidLoginCredentials)
  })

  it("Throws if password is incorrect", async () => {
    mockFindUserByEmail.mockResolvedValue({id: userId, password_hash: passwordHash})
    mockVerifyPassword.mockResolvedValue(false, )
    mockSignToken.mockResolvedValue({sub: userId})
    return expect(login({
      email,
      password
    })).rejects.toBeInstanceOf(InvalidLoginCredentials)
  })

  it("Resolves when email exists and password is correct", async () => {
    mockFindUserByEmail.mockResolvedValue({id: userId, password_hash: passwordHash})
    mockVerifyPassword.mockResolvedValue(true)
    mockSignToken.mockResolvedValue(token)
    const user = await login({
      email,
      password
    })
    expect(mockFindUserByEmail).toHaveBeenCalledTimes(1)
    expect(mockFindUserByEmail).toHaveBeenCalledWith(email)

    expect(mockVerifyPassword).toHaveBeenCalledTimes(1)
    expect(mockVerifyPassword).toHaveBeenCalledWith(password, passwordHash)

    expect(mockSignToken).toHaveBeenCalledTimes(1)
    expect(mockSignToken).toHaveBeenCalledWith({sub: userId})

    expect(user).toBe(token)
  })
})
