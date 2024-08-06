import { validate } from "class-validator";
import slugify from "slugify";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
  NotFoundException,
} from "@nestjs/common";
import { isNull, isUndefined } from "../utils/validation.util";

@Injectable()
export class CommonService {
  private readonly loggerService: LoggerService;

  constructor() {
    this.loggerService = new Logger(CommonService.name);
  }

  /**
   * Validate Entity
   *
   * Validates an entities with the class-validator library
   */
  async validateEntity(entity: any): Promise<void> {
    const errors = await validate(entity);
    const messages: string[] = [];

    for (const error of errors) {
      messages.push(...Object.values(error.constraints));
    }

    if (errors.length > 0) {
      throw new BadRequestException(messages.join(",\n"));
    }
  }

  /**
   * Check Entity Existence
   *
   * Checks if a findOne query didn't return null or undefined
   */
  public checkEntityExistence<T>(
    entity: T | null | undefined,
    name: string
  ): void {
    if (isNull(entity) || isUndefined(entity)) {
      throw new NotFoundException(`${name} not found`);
    }
  }

  /**
   * Save Entity
   *
   * Validates, saves and flushes entities into the DB
   */
  async saveEntity<T>(manager: any, entity: T, isNew = false): Promise<void> {
    await this.validateEntity(entity);

    if (isNew) {
      manager.persist(entity);
    }

    await this.throwDuplicateError(manager.flush());
  }

  /**
   * Remove Entity
   *
   * Removes an entities from the DB.
   */
  async removeEntity<T>(manager: any, entity: T): Promise<void> {
    await this.throwInternalError(manager.removeAndFlush(entity));
  }

  /**
   * Throw Duplicate Error
   *
   * Checks is an error is of the code 23505, PostgreSQL's duplicate value error,
   * and throws a conflict exception
   */
  async throwDuplicateError<T>(promise: Promise<T>, message?: string) {
    try {
      return await promise;
    } catch (error) {
      this.loggerService.error(error);

      if (error.code === "23505") {
        throw new ConflictException(message ?? "Duplicated value in database");
      }

      throw new BadRequestException(error.message);
    }
  }

  /**
   * Throw Internal Error
   *
   * Function to abstract throwing internal server exception
   */
  async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.loggerService.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Format Name
   *
   * Takes a string trims it and capitalizes every word
   */
  public formatName(title: string): string {
    return title
      .trim()
      .replace(/\n/g, " ")
      .replace(/\s\s+/g, " ")
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
  }

  /**
   * Generate Point Slug
   *
   * Takes a string and generates a slug with dtos as word separators
   */
  public generatePointSlug(str: string): string {
    return slugify(str, {
      lower: true,
      replacement: ".",
      remove: /['_\.\-]/g,
    });
  }
}
