import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from '../authors.controller';
import { AuthorsService } from '../authors.service';
import { CreateAuthorDto } from '../dto/create-author.dto';

const createAuthorDto: CreateAuthorDto = {
  name: 'test #1',
  email: 'test1@gmail.com',
  password: 'test12345',
};

describe('AuthorsController', () => {
  let authorsController: AuthorsController;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        AuthorsService,
        {
          provide: AuthorsService,
          useValue: {
            createAuthor: jest
              .fn()
              .mockImplementation((author: CreateAuthorDto) => Promise.resolve({ id: 1, ...author })),
            getAuthors: jest.fn().mockResolvedValue([
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
            ]),
            getOne: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'test #1',
                email: 'test1@gmail.com',
                password: 'test12345',
              },
            ]),
            remove: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    authorsController = app.get<AuthorsController>(AuthorsController);
    authorsService = app.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(authorsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      authorsController.createAuthor(createAuthorDto);
      expect(authorsController.createAuthor(createAuthorDto))
      expect(authorsService.create).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('getAuthors()', () => {
    it('should find all authors ', () => {
      expect(authorsController.getAuthors({ search: 'test' }, {})).resolves.toEqual([
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
      ]);
      expect(authorsService.getAuthors).toHaveBeenCalled();
    });
  });

  describe('getOne()', () => {
    it('should find a user', () => {
      expect(authorsController.getOne(1)).resolves.toEqual([
        {
          id: 1,
          name: 'test #1',
          email: 'test1@gmail.com',
          password: 'test12345',
        },
      ]);
      expect(authorsService.getOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      authorsController.remove(2);
      expect(authorsService.remove).toHaveBeenCalled();
    });
  });
});
