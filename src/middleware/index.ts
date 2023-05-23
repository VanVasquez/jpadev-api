import { NextFunction, Request, Response } from "express";

//  Allowed origins 
export const allowedOrigins = [
  "http://localhost:3000",
  "jpadev-client-e4o7hk530-vanvasquez.vercel.app",
  "jpadev-client.vercel.app"
];

// Credentials
export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin: string | undefined = req.headers.origin; 
  if (allowedOrigins.includes(origin as string)) {  
    res.header("Access-Control-Allow-Credentials", "true");
    }
  next();
};