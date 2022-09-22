import {Body, Controller, Post, Request} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { SignDto } from 'src/users/dto/sign.dto';

@ApiTags('Token')
@Controller('token')
export class TokenController {

}