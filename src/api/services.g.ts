import {
  BodyAuthApiV1UserAuthPost,
  DeleteSuccessResponse,
  HTTPValidationError,
  Project,
  Projects,
  ProjectSave,
  ProjectSaveUpdate,
  TokenBase,
  UpdateProject,
  UpdateSuccessResponse,
  UserBase,
  UserCreate,
  UserCreateResponse,
} from "./types.g";
import { ContentType, HttpClient, RequestParams } from "./apiConnection.g";

export class UserService {
  private static client = new HttpClient();
  static get RoutePath(): string {
    return "User";
  }

  /**
   * Create User
   *
   * @request POST:/api/v1/User/
   */
  static createUserApiV1UserPost = async (data: UserCreate, params: RequestParams = {}) =>
    this.client.request<UserCreateResponse, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * Delete User
   *
   * @request DELETE:/api/v1/User/{user_id}
   */
  static deleteUserApiV1UserUserIdDelete = async (userId: string, params: RequestParams = {}) =>
    this.client.request<DeleteSuccessResponse, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/${userId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * Auth
   *
   * @request POST:/api/v1/User/auth
   */
  static authApiV1UserAuthPost = async (data: BodyAuthApiV1UserAuthPost, params: RequestParams = {}) =>
    this.client.request<TokenBase, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/auth`,
      method: "POST",
      body: data,
      type: ContentType.UrlEncoded,
      format: "json",
      ...params,
    });

  /**
   * Get Current User
   *
   * @request GET:/api/v1/User/me
   */
  static getCurrentUserApiV1UserMeGet = async (params: RequestParams = {}) =>
    this.client.request<UserBase, any>({
      path: "api/v1/" + this.RoutePath + `/me`,
      method: "GET",
      format: "json",
      ...params,
    });
}

export class ProjectService {
  private static client = new HttpClient();
  static get RoutePath(): string {
    return "Project";
  }

  /**
   * Get Projects
   *
   * @request GET:/api/v1/Project/
   */
  static getProjectsApiV1ProjectGet = async (params: RequestParams = {}) =>
    this.client.request<Projects, any>({
      path: "api/v1/" + this.RoutePath + `/`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * Create Project
   *
   * @request POST:/api/v1/Project/
   */
  static createProjectApiV1ProjectPost = async (data: UpdateProject, params: RequestParams = {}) =>
    this.client.request<Project, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * Get Project By Id
   *
   * @request GET:/api/v1/Project/{project_id}
   */
  static getProjectByIdApiV1ProjectProjectIdGet = async (projectId: string, params: RequestParams = {}) =>
    this.client.request<Project, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/${projectId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * Update Project
   *
   * @request PUT:/api/v1/Project/{project_id}
   */
  static updateProjectApiV1ProjectProjectIdPut = async (
    projectId: string,
    data: UpdateProject,
    params: RequestParams = {},
  ) =>
    this.client.request<UpdateSuccessResponse, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/${projectId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * Delete Project
   *
   * @request DELETE:/api/v1/Project/{project_id}
   */
  static deleteProjectApiV1ProjectProjectIdDelete = async (projectId: string, params: RequestParams = {}) =>
    this.client.request<DeleteSuccessResponse, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/${projectId}`,
      method: "DELETE",
      format: "json",
      ...params,
    });

  /**
   * Get Project Save
   *
   * @request GET:/api/v1/Project/{project_id}/save
   */
  static getProjectSaveApiV1ProjectProjectIdSaveGet = async (projectId: string, params: RequestParams = {}) =>
    this.client.request<ProjectSave, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/${projectId}/save`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * Update Project Save
   *
   * @request PUT:/api/v1/Project/{project_id}/save
   */
  static updateProjectSaveApiV1ProjectProjectIdSavePut = async (
    projectId: string,
    data: ProjectSaveUpdate,
    params: RequestParams = {},
  ) =>
    this.client.request<UpdateSuccessResponse, HTTPValidationError>({
      path: "api/v1/" + this.RoutePath + `/${projectId}/save`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
