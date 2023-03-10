import { UserRepository } from '../repositories/interfaces/UserRepository.ts';
import { MongoUserRepository } from '../repositories/mongo/MongoUserRepository.ts';
import { Jwt, jwtUtil } from '../utils/Jwt.ts';
import { Uuid } from '../utils/Uuid.ts';
import { Encrypt } from '../utils/Encrypt.ts';
import { InputValidate } from '../utils/InputValidate.ts';
import { UserCreateDto } from '../dto/user-create.dto.ts';
import {
  UserAlreadyExistsException,
  UserCreateException,
  UserNotFoundException,
  UserPhoneNotValidException,
} from '../exceptions/users/index.ts';
import { UserLoginDto } from '../dto/user-login.dto.ts';
import { AuthPasswordNotValidException } from '../exceptions/auth/index.ts';
import config from '../config.ts';

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class AuthService {
  private readonly userRepository: UserRepository;
  private readonly uuidUtil: Uuid;
  private readonly encryptUtil: Encrypt;
  private readonly inputValidateUtil: InputValidate;
  private readonly jwtUtil: Jwt;

  constructor(
    userRepository: UserRepository,
    uuidUtil: Uuid,
    encryptUtil: Encrypt,
    inputValidateUtil: InputValidate,
    jwtUtil: Jwt,
  ) {
    this.userRepository = userRepository;
    this.uuidUtil = uuidUtil;
    this.encryptUtil = encryptUtil;
    this.inputValidateUtil = inputValidateUtil;
    this.jwtUtil = jwtUtil;
  }

  async signup(
    { name, dni, password, phone, address }: UserCreateDto,
  ): Promise<string> {
    const uuid = this.uuidUtil.generate();
    const hashedPassword = await this.encryptUtil.hash(password);
    const createdAt = new Date();
    const updatedAt = createdAt;

    if (!this.inputValidateUtil.digitsValidate(phone, 10)) {
      throw new UserPhoneNotValidException();
    }

    const userExists = await this.userRepository.getByPhone(phone);
    if (userExists) throw new UserAlreadyExistsException();

    const userCreate = await this.userRepository.upsert(undefined, {
      createdAt,
      updatedAt,
      dni,
      name,
      phone,
      address,
      role: Role.USER,
      password: hashedPassword,
      uuid,
    });

    if (!userCreate) throw new UserCreateException();

    return userCreate;
  }

  async signin({ phone, password }: UserLoginDto) {
    const user = await this.userRepository.getByPhone(phone);
    if (!user) throw new UserNotFoundException();

    const validPassword = await this.encryptUtil.validate(
      password,
      user.password,
    );
    if (!validPassword) throw new AuthPasswordNotValidException();

    return await this.jwtUtil.signJwt({
      userId: String(user.uuid),
      expiresIn: config.JWT_EXPIRES_IN,
      secretKey: config.JWT_SECRET,
    });
  }
}

const userRepository = new MongoUserRepository();
const uuidUtil = new Uuid();
const encryptUtil = new Encrypt();
const inputaValidateUtil = new InputValidate();

export const authService = new AuthService(
  userRepository,
  uuidUtil,
  encryptUtil,
  inputaValidateUtil,
  jwtUtil,
);
