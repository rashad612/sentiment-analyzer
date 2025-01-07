import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'sentiments' })
export class SentimentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'numeric' })
  score: number;

  @Column({ type: 'numeric' })
  magnitude: number;

  @ManyToOne(() => UserEntity, (user) => user.sentiments)
  user: UserEntity;
}
