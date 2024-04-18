import { Injectable, NestMiddleware, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { IUser } from "src/interfaces/user.interface";
import { Auth } from "src/utils/auth";


interface RequestWithUser extends Request {
    user: IUser;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    async use(@Req() req: RequestWithUser,@Res() res: Response, next: NextFunction) {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({
                message:"Token not found",
            })
        }
        const decoded = await new Auth().decodeToken(token);
        if(!decoded) {
            return res.status(401).json({
                message:"Invalid token",
            })
        }
        req.user = decoded;
        next();
    }
    
}