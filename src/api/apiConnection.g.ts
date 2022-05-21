import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private format?: ResponseType;

  appApiUrl?: string = process.env.REACT_APP_API_URL;
  appTokenName?: string = process.env.REACT_APP_TOKEN_NAME;

  constructor({ format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    const apiConnection = axios.create({ ...axiosConfig, baseURL: this.appApiUrl });

    apiConnection.interceptors.response.use(
      (response) => {
        if (response.status === 401 || response.status === 400) {
          throw response;
        }
        return response;
      },
      (error) => {
        const errors = error?.response?.data;
        throw errors;
      },
    );

    apiConnection.interceptors.request.use((config) => {
      const token = this.getToken();
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance = apiConnection;
    this.format = format;
  }

  getToken() {
    return localStorage.getItem(this.appTokenName || "token");
  }

  public request = async <T = any, _E = any>({
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const requestParams = params;
    const responseFormat = (format && this.format) || void 0;

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}
