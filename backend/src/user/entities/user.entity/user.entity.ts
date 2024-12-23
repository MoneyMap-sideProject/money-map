import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  //   @Column({ length: 255 })
  //   password: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
