import { entryType } from '../../common/enums/entryType';
import { IsEnum, IsString, IsDate, Length, MaxLength } from 'class-validator';

/* 
  입력된 참가자를 등록합니다.
*/

export class CreateEntryDto {
  @IsString()
  @Length(12)
  taikoId: string; // 태고 북 번호

  @IsString()
  @MaxLength(10)
  entryName: string; // 참가자 닉네임

  @IsString()
  @MaxLength(50)
  contacts: string; // 이메일 연락처

  @IsEnum(entryType)
  @MaxLength(10)
  entryType: entryType; // 참가리그

  @IsDate()
  entryAt: Date; // 참가 시점

  @IsDate()
  expiredAt: Date; // 등록을 했으나 점수가 갱신되지 않을 경우 자동으로 삭제되는 기간
}
