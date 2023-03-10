export class UserEntity {
  uuid?: string;
  name!: string;
  dni!: string;
  phone!: string;
  address!: string;
  role!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
