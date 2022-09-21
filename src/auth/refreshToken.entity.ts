import { ApiProperty } from '@nestjs/swagger';
import { sign } from 'jsonwebtoken';
import { User } from 'src/users/users.entity';
import { OneToOne, PrimaryGeneratedColumn } from 'typeorm';

class RefreshToken {
  @ApiProperty({ example: 1, description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty({ example: 1, description: 'Unique identificator' })
  @OneToOne(() => User)
  user: number;

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}

export default RefreshToken;