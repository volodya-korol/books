import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/models/authors/entities/author.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique id' })
  id: number;

  @ManyToOne(() => Author, (author: Author) => author.books)
  author: number;

  @Column()
  @ApiProperty({ example: 'My book' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false, example: 'description book', description: 'Short description book' })
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false,example: 'sdfds6f4ds94f98',  description: 'Cover your book' })
  cover?: string;

  @Column()
  @ApiProperty({ example: 'eng', description: 'The language of your book' })
  language: string;

  @Column()
  @ApiProperty()
  file: string;

  @Column('text', { array: true })
  @ApiProperty({ example: ['book', 'self development'] })
  hashTags: string[];

  @Column({ default: 0 })
  @ApiProperty({ example: 245, description: 'Еhe number of people who downloaded the book', default: 0 })
  downloads: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2022-03-18T14:59:16.137Z', description: 'Books creation date' })
  created_at: Date;
}
