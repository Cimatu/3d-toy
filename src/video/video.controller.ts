import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './video.entity';
import { VideoService } from './video.service';

class DeleteResponse {
    @ApiProperty({ example: 'FAQ was successfuly deleted' })
    message: string;
}


@ApiTags('Video')
@Controller('video')
export class VideoController {

    constructor(private videoService: VideoService) { }

    @ApiOperation({ summary: 'Add video' })
    @ApiResponse({ status: 200, type: Video })
    @Post('create')
    create(@Body() videoDto: CreateVideoDto) {
        return this.videoService.createVideo(videoDto);
    }
    
    @ApiOperation({ summary: 'Update video by id' })
    @ApiResponse({ status: 200, type: Video })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() videoDto: CreateVideoDto) {
        return this.videoService.updateVideoById(id, videoDto);
    }

    @ApiOperation({ summary: 'Delete video by id' })
    @ApiResponse({ status: 200, type: DeleteResponse })
    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.videoService.deleteVideoById(id);
    }

    @ApiOperation({ summary: `Get video list` })
    @ApiResponse({ status: 200, type: [Video] })
    @Get('get_all')
    getAll() {
        return this.videoService.getAllVideo();
    }

    @ApiOperation({ summary: 'Get one single video by its id'  })
    @ApiResponse({ status: 200, type: Video })
    @Get('get_one/:id')
    getOne(@Param('id') id: number) {
        return this.videoService.getVideoById(id);
    }
}
