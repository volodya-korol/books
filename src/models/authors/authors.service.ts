import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author-dto.dto';
import { Author } from './entities/author.entity';
import { Follower } from './entities/folower.entity';
import { AuthorNotFoundException } from './exceptions/author-with-not-exist.exception';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Follower) private followerRepository: Repository<Follower>,
  ) {}

  //* authors

  async getOne(id: number) {
    const author = await this.authorRepository.findOne(id);
    if (!author) throw new AuthorNotFoundException('id');
    return author;
  }

  async getById(id: number) {
    const author = await this.authorRepository.findOne({ id });
    if (!author) throw new AuthorNotFoundException('id');
    return author;
  }

  async getByEmail(email: string) {
    const author = await this.authorRepository.findOne({ email });
    if (!author) throw new AuthorNotFoundException('email');
    return author;
  }

  async isExist(authorField: Partial<Author>) {
    const author = await this.authorRepository.findOne(authorField);
    if (!author) false;
    return true;
  }

  async getAuthors(search: string, offset: number, limit: number) {
    const [data, count] = await this.authorRepository.findAndCount({
      where: { name: Like(`%${search}%`) },
      order: {
        id: 'ASC',
      },
      skip: offset * limit,
      take: limit,
    });

    return { data, count };
  }

  async create(createAuthor: CreateAuthorDto) {
    const newAuthor = this.authorRepository.create(createAuthor);
    await this.authorRepository.save(newAuthor);
    return newAuthor;
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.getById(id);
    const updatedAuthor = await this.authorRepository.save({ id, ...author, ...updateAuthorDto });
    return { ...updatedAuthor, password: null };
  }

  updateAvatar(id: number, filename: string) {
    return this.authorRepository.save({
      id: id,
      avatar: filename,
    });
  }

  remove(id: number) {
    this.authorRepository.delete(id);
  }

  //* utils
  async changePassword(email: string, password: string) {
    const author = await this.getByEmail(email);
    await this.authorRepository.save({ ...author, password });
    return author;
  }

  async confirm(email: string) {
    const author = await this.getByEmail(email);
    await this.authorRepository.save({ ...author, confirmed: true });
    return author;
  }

  //* followers
  async follow(followerId: number, followingId: number) {
    await this.getById(followingId);
    const follow = this.followerRepository.create({
      followerId,
      followingId,
    });
    this.followerRepository.save(follow);
    return follow;
  }

  unFollow(followerId: number, followingId: number) {
    this.followerRepository.delete({
      followerId,
      followingId,
    });
  }

  async getFollowing(authorId: number) {
    const followings = await this.followerRepository.find({ followingId: authorId });
    const ids = followings.map((m) => m.followerId);
    return this.authorRepository.findByIds(ids);
  }

  async getFollowers(authorId: number) {
    const followers = await this.followerRepository.find({ followerId: authorId });
    const ids = followers.map((m) => m.followingId);
    return this.authorRepository.findByIds(ids);
  }
}
