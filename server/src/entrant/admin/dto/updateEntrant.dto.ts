import { IntegerType } from 'typeorm';
import { entryType } from '../../../common/enums/entryType';
import {
  IsEnum,
  IsString,
  IsDate,
  Length,
  MaxLength,
  IsInt,
} from 'class-validator';

/* 
  참가자의 정보를 수정합니다.
*/

export class UpdateEntrantDto {
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

  @IsInt()
  songScore1: IntegerType; // 점수

  @IsInt()
  songScore2: IntegerType; // 점수

  @IsInt()
  songScore3: IntegerType; // 점수
}
