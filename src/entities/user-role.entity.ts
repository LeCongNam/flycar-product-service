import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { USER_ROLE_CONSTANTS } from '../constants';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @Index()
  @ManyToOne(() => Role, (role) => role.userRoles, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  role: Role;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @Column({ default: USER_ROLE_CONSTANTS.STATUS.ACTIVE })
  isActive: boolean;
}
