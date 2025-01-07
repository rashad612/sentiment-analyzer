import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;
}
