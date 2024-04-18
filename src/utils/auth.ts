import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class Auth {
    async generateToken(user:any) {
        try {
            const obj = {
                _id:user.id,
                name:user.name,
                email:user.email,
                password:user.password,
            }
            const token = await jwt.sign(obj,process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
    
            return token;
    
        } catch (error) {
            console.log(error);
        }
    }

    async decodeToken(token:string) {
        const userDetails = jwt.verify(token,process.env.JWT_SECRET_KEY);
        return userDetails;
    }

    async encryptPassword(password:string) {
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
    }

    async comparePassword(password:string,userPassword:string) {
        const isSame = await bcrypt.compare(password,userPassword);
        return isSame;
    }
}