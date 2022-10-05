import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailsModule from 'src/cars/details/details.module';
import UsersModule from 'src/users/users.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([Notification]),

  ],
})
export default class OrdersModule { }
