import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ROLE_CONSTANTS } from '../constants';
import { BaseEntity } from './base.entity';
import { UserRole } from './user-role.entity';

export class Role extends BaseEntity {
  constructor(partial: Partial<Role> | null = null) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(['name'])
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Exclude()
  @Column({ default: ROLE_CONSTANTS.STATUS.ACTIVE })
  isActive: boolean;

  @Column({ type: 'json' })
  permissions: string[];

  @OneToMany(() => UserRole, (ur) => ur.role)
  userRoles?: UserRole[];

  @BeforeInsert()
  setDefaultPermissions() {
    if (!this.permissions || this.permissions.length === 0) {
      this.permissions = [];
    }
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      permissions: this.permissions,
    };
  }
}
