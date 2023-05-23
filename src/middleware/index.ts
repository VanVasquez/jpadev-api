import { NextFunction, Request, Response } from "express";

//  Allowed origins 
export const allowedOrigins = [
  "http://localhost:3000",
  "https://jpadev-client-e4o7hk530-vanvasquez.vercel.app",
  "https://jpadev-client.vercel.app/",
  "https://jpadev-client-8jv77pp0y-vanvasquez.vercel.app/"
];

// Credentials
export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin: string | undefined = req.headers.origin; 
  console.log(origin)
  if (allowedOrigins.includes(origin as string)) {  
    res.header("Access-Control-Allow-Credentials", "true");
    }
  next();
};