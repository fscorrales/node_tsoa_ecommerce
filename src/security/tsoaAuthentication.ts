import * as express from 'express'
import { verify } from 'jsonwebtoken'

// import * as hapi from '@hapi/hapi'

// import { Request } from 'koa'

export async function expressAuthentication (
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'api_key') {
    let token
    if ('access_token' in request.query) {
      token = request.query.access_token
    }

    if (token === 'abc123456') {
      return await Promise.resolve({
        id: 1,
        name: 'Ironman'
      })
    } else {
      return await Promise.reject(new Error('Invalid token'))
    }
  }

  if (securityName === 'jwt') {
    const token = request.cookies.access_token

    return await new Promise((resolve, reject) => {
      if (token === null || token === undefined) {
        reject(new Error('No token provided'))
      }
      verify(token, '[secret]', function (err: any, decoded: any) {
        if (err instanceof Error) {
          reject(err)
        } else {
          // Check if JWT contains all required scopes
          if (scopes != null) {
            for (const scope of scopes) {
              if ((decoded as { scopes: string[] }).scopes.includes(scope)) {
                reject(new Error('JWT does not contain required scope.'))
              }
            }
          }
          resolve(decoded)
        }
      })
    })
  }
}

// export async function hapiAuthentication (
//   request: hapi.Request,
//   securityName: string,
//   scopes?: string[]
// ): Promise<any> {
//   // See above
// }
// export async function koaAuthentication (
//   request: Request,
//   securityName: string,
//   scopes?: string[]
// ): Promise<any> {
//   // See above
// }
