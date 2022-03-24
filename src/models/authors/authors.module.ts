import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { Author } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entities/folower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), TypeOrmModule.forFeature([Follower])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
