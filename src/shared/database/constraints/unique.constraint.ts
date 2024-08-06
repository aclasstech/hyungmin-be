import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import { isNil, merge } from "lodash";
import { DataSource, ObjectType } from "typeorm";

interface Condition {
  entity: ObjectType<any>;
  field?: string;
}

/**
 * Kiểm tra tính unique
 */
@ValidatorConstraint({ name: "entityItemUnique", async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const config: Omit<Condition, "entity"> = {
      field: args.property,
    };
    const condition = ("entity" in args.constraints[0]
      ? merge(config, args.constraints[0])
      : {
          ...config,
          entity: args.constraints[0],
        }) as unknown as Required<Condition>;
    if (!condition.entity) return false;
    try {
      const repo = this.dataSource.getRepository(condition.entity);
      return isNil(
        await repo.findOne({
          where: { [condition.field]: value },
        })
      );
    } catch (err) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const { entity, property } = args.constraints[0];
    const queryProperty = property ?? args.property;
    if (!(args.object as any).getManager)
      return "Hàm getManager không tồn tại!";

    if (!entity) return "Model chưa được chỉ định!";

    return `${queryProperty} của ${entity.name} là duy nhất!`;
  }
}

/**
 * Kiểm tra tính unique của dữ liệu
 * @param entity Thực thể
 * @param validationOptions
 */
function IsUnique(
  entity: ObjectType<any>,
  validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void;

function IsUnique(
  condition: Condition,
  validationOptions?: ValidationOptions
): (object: Record<string, any>, propertyName: string) => void;

function IsUnique(
  params: ObjectType<any> | Condition,
  validationOptions?: ValidationOptions
) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [params],
      validator: UniqueConstraint,
    });
  };
}

export { IsUnique };
