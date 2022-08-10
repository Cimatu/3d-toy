import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersModule from 'src/users/users.module';
import EventsModule from '../events.module';
import { UserDataController } from './usersData.controller';
import { UserData } from './usersData.entity';
import { UserDataService } from './usersData.service';


@Module({
    controllers: [UserDataController],
    providers: [UserDataService],
    imports: [
        TypeOrmModule.forFeature([UserData]),
        UsersModule,
        EventsModule
    ],

})
export default class UserDataModule { }
