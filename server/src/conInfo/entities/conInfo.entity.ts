import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('coninfo')
export class ConInfo {
  @PrimaryColumn({ length: 12 })
  Id: string; // 대회 고유 ID

  @Column({ length: 50 })
  name: string; // 대회 이름

  @Column({ length: 300 })
  detail: string; // 상세 설명

  @Column({
    name: 'entry_at',
    type: 'datetime',
  })
  startAt: Date; // 시작 기간

  @Column({
    name: 'expired_at',
    type: 'datetime',
  })
  endAt: Date; // 종료 기간
}
