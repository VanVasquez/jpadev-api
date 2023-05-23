import jwt from 'jsonwebtoken'

interface TData { 
  email: string;
  last_name: string; 
}

export function generateAccessToken (data: TData) {
  return jwt.sign({
    "UserInfo": {
      "email": data.email,
      "last_name": data.last_name
    },
  }, process.env.ACCESS_TOKEN_SECRET_KEY || '',
  {expiresIn: '1h'})
}

export function generateRefreshToken (data: TData) {
  return jwt.sign({
      "email": data.email,
    }, process.env.REFRESH_TOKEN_SECRET_KEY || '',
    {expiresIn: '7d'})
}