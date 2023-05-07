import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryColumn({
    name: 'name',
    length: 30,
  })
  name: string;

  @Column({
    name: 'password',
    length: 30,
  })
  password: string;

  @Column({
    name: 'signup_verify_token',
    length: 60,
  })
  signupVerifyToken: string;
}
