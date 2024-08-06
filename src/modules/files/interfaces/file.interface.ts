import { BaseInterfaceRepository } from "~/common/bases/repository/base.interface";
import { FileEntity } from "../entities/file.entity";

export type FileRepositoryInterface = BaseInterfaceRepository<FileEntity>;
