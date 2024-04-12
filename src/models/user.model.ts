import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";
@Schema()
export class User {

   @Prop()
   name: string;
   @Prop()
   email: string;
   @Prop()
   password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);