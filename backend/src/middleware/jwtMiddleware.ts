import { Request, Response, NextFunction } from 'express'
import { auth } from 'express-oauth2-jwt-bearer'

export const jwtCheck = auth({
	audience: 'recipe identifier',
	issuerBaseURL: 'https://dev-3nj4djtzbgg2m04j.us.auth0.com/',
	tokenSigningAlg: 'RS256',
})

export const validateJwt = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	jwtCheck(req, res, next)
}
