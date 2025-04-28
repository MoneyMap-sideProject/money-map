import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity/user.entity';

@Entity()
export class FinancialData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column('json')
  current_user: {
    age: number;
    salary: number;
    assets: number;
    investRate: number;
  };

  @Column('json')
  annual_change_rate: {
    salary: number;
    inflation: number;
    investment: number;
  };

  @Column('json')
  monthly_fixed_cost: {
    rent: number;
    communication: number;
    insurance: number;
    etc: number;
  };

  @Column('json')
  monthly_variable_cost: {
    food: number;
    travel: number;
    transportation: number;
    etc: number;
  };

  @Column('json', { nullable: true })
  results: any[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
