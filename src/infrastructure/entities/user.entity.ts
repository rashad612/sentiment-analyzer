import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { SentimentEntity } from './sentiment.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @OneToMany(() => SentimentEntity, (sentiment) => sentiment.user)
  sentiments: SentimentEntity[];
}
