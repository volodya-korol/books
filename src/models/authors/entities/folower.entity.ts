import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follower {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 8, description: 'Unique id' })
  id: number;

  @Column()
  @ApiProperty({example: 2, })
  followerId: number;

  @Column()
  @ApiProperty({example: 1, })
  followingId: number;

  @CreateDateColumn()
  @ApiProperty({example: "2022-03-18T14:59:16.137Z", description: 'following date' })
  createdAt: Date;
}
