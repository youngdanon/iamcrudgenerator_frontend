export interface DeleteSuccessResponse {
  /** Detail */
  detail?: string;
}

export interface Entity {
  /** Table Name */
  table_name: string;
  api_operations: Operations[];

  /** Fields */
  fields: EntityField[];
}

export interface EntityField {
  /** Name */
  name: string;

  /** An enumeration. */
  type: Fields;

  /** Required */
  required?: boolean;
}

/**
 * An enumeration.
 */
export enum Fields {
  IntegerField = "IntegerField",
  FloatField = "FloatField",
  CharField = "CharField",
  TextField = "TextField",
}

export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/**
 * An enumeration.
 */
export enum Operations {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export interface Project {
  /** Id */
  id: number;

  /** Owner Id */
  owner_id?: number;

  /** Name */
  name: string;

  /**
   * Created At
   * @format date-time
   */
  created_at: string;

  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

export interface ProjectSave {
  /** Name */
  name: string;

  /** Models */
  models: Entity[];
}

export interface ProjectSaveUpdate {
  /** Models */
  models: Entity[];
}

export interface Projects {
  /** Projects */
  projects: Project[];
}

export interface TokenBase {
  /** Access Token */
  access_token: string;

  /** Token Type */
  token_type?: string;
}

export interface UpdateProject {
  /** Name */
  name?: string;
}

export interface UpdateSuccessResponse {
  /** Detail */
  detail?: string;
}

export interface UserAuth {
  /** Username */
  username: string;

  /** Password */
  password: string;
}

/**
 * Формирует тело ответа с деталями пользователя
 */
export interface UserBase {
  /** Id */
  id: number;

  /**
   * Email
   * @format email
   */
  email: string;

  /** Username */
  username: string;
}

/**
 * Проверяет sign-up запрос
 */
export interface UserCreate {
  /**
   * Email
   * @format email
   */
  email: string;

  /** Username */
  username: string;

  /** Password */
  password: string;
}

/**
 * Формирует тело ответа с деталями нового пользователя
 */
export interface UserCreateResponse {
  /** Id */
  id: number;

  /**
   * Email
   * @format email
   */
  email: string;

  /** Username */
  username: string;

  /** Token */
  token?: TokenBase;
}

export interface ValidationError {
  /** Location */
  loc: (string | number)[];

  /** Message */
  msg: string;

  /** Error Type */
  type: string;
}
