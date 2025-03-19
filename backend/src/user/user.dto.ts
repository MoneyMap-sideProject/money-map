import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securepassword',
    description: '비밀번호',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword', description: '비밀번호' })
  @IsNotEmpty()
  password: string;
}
