import {mock, expect, describe, it} from "bun:test"
import {signup} from "./signup.ts";
import {InvalidCredentials} from "./signup.ts";

const mockFindUserEmail = mock()
const mockCreateUser = mock()
const mockHashPassword = mock()

mock.module("../repo/user.repo.js", () => {
  return {
    findUserByEmail: mockFindUserEmail,
    createUser: mockCreateUser,
  }
})

mock.module("../impl/password.js", () => {
  return {
    hashPassword: mockHashPassword,
  }
})

describe("signup function", () => {
  it("Throws if email already exists", async () => {
    mockFindUserEmail.mockResolvedValue({id: '123'})
    expect(signup({
      email: "test@mail.com",
      username: "test",
      password: "123456"
    })).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
