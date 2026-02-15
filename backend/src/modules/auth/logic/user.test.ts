import {mock, expect, describe, it, afterEach} from "bun:test"
import {getUser, UserNotFound} from "./user.ts";

const mockFindUserById = mock()

mock.module("../repo/user.repo.js", () => {
  return {
    findUserById: mockFindUserById,
  }
})


afterEach(() => {
  mockFindUserById.mockReset()
})

describe("User function", () => {
  const email = 'test@mail.com'
  const username = 'test'
  const userId = '123'

  const findUserByIdResult = {
    id: userId,
    username,
    email,
  }


  it("Rejects when the user does not exist", async () => {
    mockFindUserById.mockResolvedValue(null)
    const user = getUser(userId)

    expect(mockFindUserById).toHaveBeenCalledTimes(1)
    expect(mockFindUserById).toHaveBeenCalledWith(userId)


    return expect(user).rejects.toBeInstanceOf(UserNotFound)
  })

  it("Resolves when the user does exist", async () => {
    mockFindUserById.mockResolvedValue(findUserByIdResult)
    const user = await getUser(userId)

    expect(mockFindUserById).toHaveBeenCalledTimes(1)
    expect(mockFindUserById).toHaveBeenCalledWith(userId)



    return expect(user).toEqual({
      id: findUserByIdResult.id,
      username: findUserByIdResult.username,
      email: findUserByIdResult.email
    })
  })
})
