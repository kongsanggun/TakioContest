import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('compe')
export class Compe {
  @PrimaryColumn({ length: 12 })
  compeId: string;

  @Column({})
  mode: string;

  @Column({ length: 10 })
  hostName: string;

  @Column({ length: 12 })
  hostTaikoId: string;
}
