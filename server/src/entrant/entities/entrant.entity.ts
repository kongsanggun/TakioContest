import { entryType } from '../../common/enums/entryType';
import { Entity, Column, PrimaryColumn, IntegerType } from 'typeorm';

@Entity('entrant')
export class Entrant {
  @PrimaryColumn({
    name: 'taiko_id',
    length: 12,
  })
  taikoId: string; // 태고 북 번호

  @Column({
    name: 'entry_name',
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  entryName: string; // 참가자 닉네임

  @Column({
    name: 'contacts',
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  contacts: string; // 이메일 연락처

  @Column({
    type: 'enum',
    name: 'entry_type',
    enum: entryType,
  })
  entryType: entryType; // 참가리그

  @Column({
    name: 'song_score1',
    type: 'int',
    nullable: true,
  })
  songScore1?: IntegerType; // 점수 1

  @Column({
    name: 'song_score2',
    type: 'int',
    nullable: true,
  })
  songScore2?: IntegerType; // 점수 2

  @Column({
    name: 'song_score3',
    type: 'int',
    nullable: true,
  })
  songScore3?: IntegerType; // 점수 3

  @Column({
    name: 'entry_at',
    type: 'datetime',
    nullable: false,
  })
  entryAt: Date; // 참가 시점

  @Column({
    name: 'expired_at',
    type: 'datetime',
    nullable: false,
  })
  expiredAt: Date; // 등록을 했으나 점수가 갱신되지 않을 경우 자동으로 삭제되는 기간
}
