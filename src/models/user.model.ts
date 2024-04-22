import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class User {

   @Prop()
   name: string;
   @Prop()
   email: string;
   @Prop()
   password: string;
   @Prop({minlength:10,maxlength:10})
   phoneNumber: string;
   @Prop()
   otp:string;
}
export const UserSchema = SchemaFactory.createForClass(User);