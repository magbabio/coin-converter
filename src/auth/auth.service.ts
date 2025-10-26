import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload, { noTimestamp: true }),
    };
  }

 async register(createUserDto: CreateUserDto) {
  const existingUser = await this.prisma.user.findUnique({
    where: { email: createUserDto.email },
  });

  if (existingUser) {
    throw new ConflictException('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

  const user = await this.prisma.user.create({
    data: {
      ...createUserDto,
      password: hashedPassword,
      role: 'USER', 
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    message: 'User created successfully',
    data: user,
  };
  }
}
