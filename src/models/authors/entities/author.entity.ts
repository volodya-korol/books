import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { EmailValidation } from 'src/common/validations/email.validation';
import { NameValidation } from 'src/common/validations/name.validation';
import { Book } from 'src/models/books/entities/book.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique id' })
  id: number;

  @Column()
  @NameValidation()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({required: false, example: "hjg2gg6f23rf2rf", description: 'Avatar id' })
  avatar?: string;

  @Column({ nullable: true })
  @ApiProperty({required: false, example: "my description", description: 'Short description of the author' })
  description?: string;

  @Column({ unique: true })
  @EmailValidation()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Book, (book: Book) => book.author)
  books: Book[];

  @CreateDateColumn()
  @ApiProperty({example: "2022-03-18T14:59:16.137Z", description: 'Authors creation date' })
  created_at: Date;
}
