import { entryType } from '../../common/enums/entryType';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('compe')
export class Compe {
  @PrimaryColumn({
    name: 'compe_id',
    type: 'varchar',
    nullable: false,
    length: 12,
  })
  compeId: string; // 대회 번호

  @Column({
    type: 'enum',
    name: 'entry_type',
    enum: entryType,
  })
  entryType: entryType; // 참가리그

  @Column({
    name: 'host_name',
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  hostName: string; // 주최자 이름

  @Column({
    name: 'host_taiko_id',
    type: 'varchar',
    nullable: false,
    length: 12,
  })
  hostTaikoId: string; // 주최자 북 번호

  @Column({
    name: 'start_at',
    type: 'datetime',
    nullable: false,
  })
  startAt: Date; // 시작 시간

  @Column({
    name: 'end_at',
    type: 'datetime',
    nullable: false,
  })
  endAt: Date; // 종료 시간
}
