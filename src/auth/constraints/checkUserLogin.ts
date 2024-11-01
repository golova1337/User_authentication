import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../../user/repositories/user.repository';

@ValidatorConstraint({ name: 'isEmailExist', async: true })
@Injectable()
export class LoginByEmailConstraint implements ValidatorConstraintInterface {
  constructor(readonly userRepository: UserRepository) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return user.length !== 0 ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}

export function LoginByEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: LoginByEmailConstraint,
    });
  };
}
