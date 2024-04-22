import { Document } from 'mongoose';

export interface IUser extends Document{
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly phoneNumber: string;
    readonly otp:string;
}