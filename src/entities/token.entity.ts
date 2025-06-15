import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDevice } from './user-device.entity'; // Assuming this entity exists

export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDevice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userDeviceId' })
  userDevice: UserDevice;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'timestamp' })
  iat: Date;

  @Column({ name: 'expiresAt' })
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  @Column({ name: 'replacedBy', nullable: true })
  replacedBy: number;

  @ManyToOne(() => Token, { nullable: true })
  @JoinColumn({ name: 'replacedBy' })
  replacementToken: Token;
}
