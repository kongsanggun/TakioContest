import { entryType } from '../../common/enums/entryType';
import { IsEnum, IsString, IsDate, Length, MaxLength } from 'class-validator';

/* 
  대회의 정보를 수정합니다.
*/

export class UpdateCompeDto {
  @IsString()
  @Length(12)
  compeId: string; // 대회 번호

  @IsEnum(entryType)
  @MaxLength(10)
  entryType: entryType; // 참가리그

  @IsString()
  @MaxLength(10)
  hostName: string; // 주최자 이름

  @IsString()
  @MaxLength(12)
  hostTaikoId: string; // 주최자 북 번호

  @IsDate()
  startAt: Date; // 시작 시간

  @IsDate()
  endAt: Date; // 종료 시간
}
