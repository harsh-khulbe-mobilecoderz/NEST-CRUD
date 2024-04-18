import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from 'src/models/user.model';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      {path:'user',method:RequestMethod.POST},
      { path: 'user/login', method: RequestMethod.POST }, 
      { path: 'user', method: RequestMethod.GET }, 
      {path:'/user/:id',method:RequestMethod.GET},
    )
    .forRoutes(
      {path:'user',method:RequestMethod.PUT},
      {path:'user',method:RequestMethod.DELETE}
    ); 
  }
  
}
