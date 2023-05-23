import { Request, Response } from "express";
import Users from "../model/Users";
import { comparePassword } from "../utils";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export default {
  LoginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const fetchedUser = await Users.findOne({email});
    if(!fetchedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    if(!comparePassword(password, fetchedUser.password)) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
    const accessToken = generateAccessToken(fetchedUser)
    const refreshToken = generateRefreshToken(fetchedUser)
    return res
      .status(200)
      .cookie('jwt', refreshToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      .json({
        message: "Login successful", 
        accessToken,
    });
  },
  
  CreateUser:async (req:Request, res: Response) => {
    const { email } = req.body;
    try {
      const fetchedUser = await Users.findOne({email});
      if(fetchedUser) {
        return res.status(400).json({
          message: "User already exists"
        });
      }
      const newUser = new Users(req.body);
      await newUser.save();
      return res.status(201).json({
        message: "User created successfully"
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  }
}
