import { Utils } from '@app/shared';

export const ErrorMessages = {
  required: (field: string) => `${Utils.toPascalCase(field)} is required`,
  invalidEmail: (field: string) => `Please enter a valid ${field} address`,
  alreadyExist: (field: string) => `This ${field} is already in use`,
  minSize: (field: string, minLength: number) =>
    `${Utils.toPascalCase(field)} must have at least ${minLength} elements`,
  boolean: (field: string) =>
    `${Utils.toPascalCase(field)} must be true or false`,
  string: (field: string) =>
    `${Utils.toPascalCase(field)} must be a valid string`,
  number: (field: string) =>
    `${Utils.toPascalCase(field)} must be a valid number`,
  enum: (field: string, enumType: object) =>
    `${Utils.toPascalCase(field)} must be one of the following: ${Utils.enumValuesToString(enumType)}`,
};

export const SuccessMessages = {
  insertSuccess: (value: string) =>
    `${Utils.toPascalCase(value)} has been created successfully`,
  deleteSuccess: (value: string) =>
    `${Utils.toPascalCase(value)} has been deleted successfully`,
  updateSuccess: (value: string) =>
    `${Utils.toPascalCase(value)} has been updated successfully`,
  getSuccess: (value: string) =>
    `${Utils.toPascalCase(value)} has been successfully retrieved`,
  getListSuccess: (value: string) =>
    `${Utils.toPascalCase(value)} have been successfully retrieved`,
};
