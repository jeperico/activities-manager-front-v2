import { IAuthenticatedUser } from '../../interfaces/user/authenticateduser'
import { post } from "../../providers/api.ts";
import { setCookie } from 'nookies'

export const doLogin = async (
  username: string,
  password: string
): Promise<IAuthenticatedUser | undefined> => {
  const body = {
    username,
    password,
  }

  try {
    const data = await post('token/', { body })
    console.log(data)
    const { user, token, refresh } = data

    const authenticatedUser: IAuthenticatedUser = {
      user: {
        id: user.id,
        email: user.email,
      },
      token: token,
      refresh,
    }

    setCookie(undefined, 'userId', user.id, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    localStorage.setItem('token', token)
    localStorage.setItem('refresh', refresh)

    return authenticatedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
