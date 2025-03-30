import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { redisClient } from "../libs/redis";

const JWT_SECRET = process.env.JWT_SECRET || "divyanshgoel";

export const authMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const client = await redisClient()
        if(!client){
            throw new Error('Internal server error')
        }
        const token= req.cookies?.token || req.headers.authorization?.split(" ")[1]
        if(!token){
            throw new Error('You are unauthorized')
        }

        const isTokenValid = await client.get(`jwt-${token}`)
        if(!isTokenValid){
            throw new Error('You are unauthorized')
        }
        
        const decoded:any = verify(token,JWT_SECRET) as JwtPayload | string

        (req as any).userId = decoded._id
        next()

    } catch (err:any){
        console.log(err.message)
        res.status(403).json({error:{message:err.message}})
    }
}