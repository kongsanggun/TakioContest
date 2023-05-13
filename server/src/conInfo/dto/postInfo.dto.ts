import { IsString, IsDate, Length, MaxLength } from 'class-validator';

/* 
  대회 정보를 수정합니다.
*/

export class PostConInfoDto {
  @IsString()
  @Length(12)
  Id: string; // 대회 고유 ID

  @IsString()
  @Length(12)
  UpdateId: string; // 대회 고유 ID

  @IsString()
  @MaxLength(50)
  name: string; // 대회 이름

  @IsString()
  @MaxLength(300)
  detail: string; // 상세 설명

  @IsDate()
  startAt: Date; // 시작 기간

  @IsDate()
  endAt: Date; // 종료 기간
}
