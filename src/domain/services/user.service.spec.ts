import { TestBed, Mocked } from '@suites/unit';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { User } from '@domain/entities/user';
import { Sentiment } from '@domain/entities/sentiment';
import { UserEntity } from '@infrastructure/entities/user.entity';

describe('UserService', () => {

  let userService: UserService;
  let userRepository: Mocked<UserRepository>;
  let logger: Mocked<Logger>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(UserService).compile();

    userService = unit;
    userRepository = unitRef.get(UserRepository);
    logger = unitRef.get(Logger);
  });

  it('should create new user', async () => {
    const fixtures = {
      id: 2,
      username: 'user-2',
    }
    userRepository.create.mockResolvedValue(fixtures);
    const user = await userService.createUser({ username: 'user-2' });
    expect(userRepository.create).toHaveBeenCalledWith({ username: 'user-2' });
    expect(user).toEqual<User>(fixtures);
  });

  it('should find user by username', async () => {
    const fixtures: UserEntity = { 
      id: 1,
      username: 'user-1',
      sentiments: []
    };
    userRepository.findOne.mockResolvedValue(fixtures);
    const user = await userService.findOneByUsername('user-1');
    expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'user-1' });
    expect(user).toEqual<UserEntity>(fixtures);
  });

  it(`should get user's sentiment logs`, async () => {
    const fixtures: UserEntity = { 
      id: 1,
      username: 'user-1',
      sentiments: [
        {
          id: 1,
          text: `I'm confused`,
          score: -0.800000011920929,
          magnitude: 0.800000011920929,
          user: new UserEntity(),
        },
        {
          id: 2,
          text: `I'm happy`,
          score: 0.8999999761581421,
          magnitude: 0.8999999761581421,
          user: new UserEntity(),
        }
      ],
    };
    const sentiments: Sentiment[] = [
      {
        text: `I'm confused`,
        score: -0.800000011920929,
        magnitude: 0.800000011920929,
      },
      {
        text: `I'm happy`,
        score: 0.8999999761581421,
        magnitude: 0.8999999761581421,
      }
    ];
    userRepository.findOne.mockResolvedValue(fixtures);
    const result = await userService.getSentiments('user-1');
    expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'user-1' });
    expect(result).toEqual<Sentiment[]>(sentiments);
  });

  it('should throw an exception when searched for non existing user', async () => {
    userRepository.findOne.mockResolvedValue(null);
    expect(async () => {
      await userService.findOneByUsername('user-110');
    }).rejects.toThrow(NotFoundException);
  });
});
