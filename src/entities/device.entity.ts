// src/entities/device.entity.ts
import { Column, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDevice } from './user-device.entity';

export class Device {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Index('device_id_idx', { unique: true })
  @Column({ type: 'varchar', name: 'device_id', nullable: false })
  deviceId?: string;

  @Column({ type: 'varchar', nullable: true })
  userAgent?: string | null;

  @Column({ type: 'varchar', nullable: true })
  ipAddress?: string | null;

  @Column({ type: 'varchar', nullable: true })
  country?: string | null;

  @Column({ type: 'varchar', nullable: true })
  deviceName?: string | null;

  @Column({ type: 'varchar', nullable: true })
  os?: string | null;

  // Tên property phải khớp với bên UserDevice: userDevice[]
  @OneToOne(() => UserDevice, (ud) => ud.device)
  userDevice: UserDevice;

  constructor(data: Partial<Device> = {}) {
    Object.assign(this, data);
  }
}
