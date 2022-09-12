import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './dto/create-video.dto';


@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
    ) { }

    async createVideo(dto: CreateVideoDto) {
        return await this.videoRepository.save(dto);
    }

    async updateVideoById(id: number, dto: CreateVideoDto) {
        let video = await this.getVideoById(id);
        if (!video) {
            throw new HttpException("Video not found", HttpStatus.NOT_FOUND);
        }

        if (dto.name) {
            video.name = dto.name;
        }

        if (dto.url) {
            video.url = dto.url;
        }

        return await this.videoRepository.save(video)
    }

    async deleteVideoById(id: number) {
        let video = await this.getVideoById(id);
        if (!video) {
            throw new HttpException("Video not found", HttpStatus.NOT_FOUND);
        }
        await this.videoRepository.delete(id);
        video = await this.getVideoById(id);
        if(!video){
            return {message: "Video was successfuly deleted"}
        }else{
            return {message: "Video wasn't deleted"}
        }
    }

    async getVideoById(id: number) {
        return await this.videoRepository
            .createQueryBuilder('video')
            .where('video.id = :id', { id })
            .getOne();
    }

    async getAllVideo() {
        return await this.videoRepository
            .createQueryBuilder('video')
            .getMany();
    }
}
