import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorsService } from '../authors.service';
import { Author } from '../entities/author.entity';
import { Follower } from '../entities/folower.entity';

const authorArray = [
  {
    id: 1,
    name: 'test #1',
    email: 'test1@gmail.com',
    password: 'test12345',
  },
  {
    id: 2,
    name: 'test #2',
    email: 'test2@gmail.com',
    password: 'test12345',
  },
];

const oneAuthor = {
  id: 1,
  name: 'test #1',
  email: 'test1@gmail.com',
  password: 'test12345',
};

describe('AuthorService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            getOne: jest.fn().mockResolvedValue(oneAuthor),
            getById: jest.fn().mockResolvedValue(oneAuthor),
            getByEmail: jest.fn().mockResolvedValue(oneAuthor),
            isExistEmail: jest.fn().mockResolvedValue(oneAuthor),
            getAuthors: jest.fn().mockResolvedValue(authorArray),
            create: jest.fn(),
            remove: jest.fn().mockResolvedValue(oneAuthor),
          },
        },
        {
          provide: getRepositoryToken(Follower),
          useValue: {},
        },
      ],
    })
      .overrideProvider(getRepositoryToken(Author))
      .useValue({
        find: () => oneAuthor,
        findOne: () => oneAuthor,
        save: () => oneAuthor,
        create: () => oneAuthor,
        findAndCount: () => [authorArray, 2],
        delete: () => oneAuthor,
      })
      .compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOne()', () => {
    it('should get a single author', async () => {
      const authors = await service.getOne(1);
      expect(authors).toEqual(oneAuthor);
    });
  });

  describe('getById()', () => {
    it('should get a single author', async () => {
      const authors = await service.getById(1);
      expect(authors).toEqual(oneAuthor);
    });
  });

  describe('getByEmail()', () => {
    it('should get a single author', async () => {
      const authors = await service.getByEmail('test1@gmail.com');
      expect(authors).toEqual(oneAuthor);
    });
  });

  describe('isExistEmail()', () => {
    it('should return true', async () => {
      const authors = await service.isExistEmail('test1@gmail.com');
      expect(authors).toBeTruthy();
    });
  });

  describe('getAuthors()', () => {
    it('should return an array of authors', async () => {
      const authors = await service.getAuthors('test', 0, 5);
      expect(authors).toEqual({ count: 2, data: authorArray });
    });
  });

  describe('create()', () => {
    it('should successfully insert a author', () => {
      expect(
        service.create({
          name: 'test #1',
          email: 'test1@gmail.com',
          password: 'test12345',
        }),
      ).resolves.toEqual(oneAuthor);
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const retVal = await service.remove(1);
      expect(retVal).toEqual(oneAuthor);
    });
  });
});
