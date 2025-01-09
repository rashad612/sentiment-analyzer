import { TestBed, Mocked } from '@suites/unit';
import { Logger, UnprocessableEntityException } from '@nestjs/common';
import { User } from '@domain/entities/user';
import { Sentiment } from '@domain/entities/sentiment';
import { UserEntity } from '@infrastructure/entities/user.entity';
import { SentimentService } from '@domain/services/sentiment.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { SentimentRepository } from '@infrastructure/repositories/sentiment.repository';
import { LanguageApiService } from '@infrastructure/language-api/language-api.service';

describe('SentimentService', () => {
  let sentimentService: SentimentService;
  let userRepo: Mocked<UserRepository>;
  let sentimentRepo: Mocked<SentimentRepository>;
  let languageApiService: Mocked<LanguageApiService>;
  let logger: Mocked<Logger>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(SentimentService).compile();
    sentimentService = unit;
    userRepo = unitRef.get(UserRepository);
    sentimentRepo = unitRef.get(SentimentRepository);
    languageApiService = unitRef.get(LanguageApiService);
    logger = unitRef.get(Logger);
  });

  it('should analyze sentiment for existing user', async () => {
    const user = {
      id: 1,
      username: 'user-1',
      sentiments: [],
    };

    const savedSentiment = {
      id: 4,
      text: `I'm happy`,
      score: 0.8999999761581421,
      magnitude: 0.8999999761581421,
      user,
    };

    const updatedUser = {...user, sentiments: [savedSentiment]};

    const analyzedSentiment = {
      text: `I'm happy`,
      score: 0.8999999761581421,
      magnitude: 0.8999999761581421,
    };

    userRepo.findOne.mockResolvedValue(user);
    sentimentRepo.create.mockResolvedValue(savedSentiment);
    languageApiService.analyzeSentiment.mockResolvedValue(analyzedSentiment);
    userRepo.updateSentiment.mockImplementation(async (u: UserEntity) => {
      u.sentiments.push(savedSentiment);
    });

    const result = await sentimentService.analyze({
      username: user.username,
      text: `I\'m happy`,
    });
    expect(result).toEqual<Sentiment>(analyzedSentiment);
    expect(user).toEqual<User>(updatedUser);
  });

  it('should throw an exception when trying to analyze sentiment for non existing user', async () => {
    userRepo.findOne.mockResolvedValue(undefined);
    await expect(sentimentService.analyze({
      username: 'non-existing-user',
      text: `I'm happy`,
    })).rejects.toThrow(UnprocessableEntityException);
  });

  // it('should find user by username', async () => {
  //   const fixtures: UserEntity = { 
  //     id: 1,
  //     username: 'user-1',
  //     sentiments: []
  //   };
  //   userRepository.findOne.mockResolvedValue(fixtures);
  //   const user = await userService.findOneByUsername('user-1');
  //   expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'user-1' });
  //   expect(user).toEqual<UserEntity>(fixtures);
  // });

  // it(`should get user's sentiment logs`, async () => {
  //   const fixtures: UserEntity = { 
  //     id: 1,
  //     username: 'user-1',
  //     sentiments: [
  //       {
  //         id: 1,
  //         text: `I'm confused`,
  //         score: -0.800000011920929,
  //         magnitude: 0.800000011920929,
  //         user: new UserEntity(),
  //       },
  //       {
  //         id: 2,
  //         text: `I'm happy`,
  //         score: 0.8999999761581421,
  //         magnitude: 0.8999999761581421,
  //         user: new UserEntity(),
  //       }
  //     ],
  //   };
  //   const sentiments: Sentiment[] = [
  //     {
  //       text: `I'm confused`,
  //       score: -0.800000011920929,
  //       magnitude: 0.800000011920929,
  //     },
  //     {
  //       text: `I'm happy`,
  //       score: 0.8999999761581421,
  //       magnitude: 0.8999999761581421,
  //     }
  //   ];
  //   userRepository.findOne.mockResolvedValue(fixtures);
  //   const result = await userService.getSentiments('user-1');
  //   expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'user-1' });
  //   expect(result).toEqual<Sentiment[]>(sentiments);
  // });

  // it('should throw an exception when searched for non existing user', async () => {
  //   userRepository.findOne.mockResolvedValue(null);
  //   expect(async () => {
  //     await userService.findOneByUsername('user-110');
  //   }).rejects.toThrow();
  // });
});
