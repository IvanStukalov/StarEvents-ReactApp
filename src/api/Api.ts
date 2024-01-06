/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ModelsEvent {
  completion_date?: string;
  creation_date?: string;
  creator?: string;
  creator_id?: number;
  event_id?: number;
  formation_date?: string;
  moderator?: string;
  moderator_id?: number;
  name?: string;
  status?: string;
}

export interface ModelsStar {
  age?: number;
  description?: string;
  distance?: number;
  image?: string;
  is_active?: boolean;
  magnitude?: number;
  name?: string;
  star_id?: number;
}

export interface ModelsUser {
  isAdmin?: boolean;
  /** @maxLength 64 */
  login: string;
  name?: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
  registrationDate?: string;
  userId?: number;
}

export interface ModelsUserLogin {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

export interface ModelsUserSignUp {
  /** @maxLength 64 */
  login: string;
  /**
   * @minLength 8
   * @maxLength 64
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
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
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:3000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Star Events App
 * @version 1.0
 * @baseUrl http://localhost:8080
 * @contact
 *
 * App for serving star events
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Проверяет аутентификацию текущего пользователя и возвращает его информацию
     *
     * @tags Пользователи
     * @name CheckAuthList
     * @summary Проверка аутентификации
     * @request GET:/api/check-auth
     * @secure
     */
    checkAuthList: (params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/api/check-auth`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список событий, отфильтрованных по заданным параметрам
     *
     * @tags События
     * @name EventList
     * @summary Получить список событий
     * @request GET:/api/event
     */
    eventList: (
      query?: {
        /** Статус события */
        status?: string;
        /** Верхняя граница формирования события */
        start_formation?: string;
        /** Нижняя граница формирования события */
        end_formation?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsEvent[], string>({
        path: `/api/event`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет существующее событие
     *
     * @tags События
     * @name EventDelete
     * @summary Удалить событие
     * @request DELETE:/api/event
     */
    eventDelete: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/event`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создает новое событие
     *
     * @tags События
     * @name EventFormUpdate
     * @summary Создать событие
     * @request PUT:/api/event/form
     */
    eventFormUpdate: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/event/form`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает информацию о событии по его ID
     *
     * @tags События
     * @name EventDetail
     * @summary Получить событие по ID
     * @request GET:/api/event/{id}
     */
    eventDetail: (id: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, string>({
        path: `/api/event/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет существующее событие по его ID
     *
     * @tags События
     * @name EventUpdate
     * @summary Обновить событие
     * @request PUT:/api/event/{id}
     */
    eventUpdate: (
      id: number,
      query: {
        /** Новое название события */
        name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/api/event/${id}`,
        method: "PUT",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменяет статус существующего события
     *
     * @tags События
     * @name EventStatusUpdate
     * @summary Изменить статус события
     * @request PUT:/api/event/{id}/status
     */
    eventStatusUpdate: (
      id: number,
      query: {
        /** Новый статус события */
        status: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/api/event/${id}/status`,
        method: "PUT",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Отменяет аутентификацию пользователя и удаляет JWT токен
     *
     * @tags Пользователи
     * @name LogoutCreate
     * @summary Выход из системы
     * @request POST:/api/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/logout`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Авторизует пользователя и возвращает JWT токен
     *
     * @tags Пользователи
     * @name SignInCreate
     * @summary Авторизация пользователя
     * @request POST:/api/signIn
     * @secure
     */
    signInCreate: (user: ModelsUserLogin, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/signIn`,
        method: "POST",
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Регистрирует нового пользователя с заданными параметрами
     *
     * @tags Пользователи
     * @name SignUpCreate
     * @summary Регистрация нового пользователя
     * @request POST:/api/signUp
     */
    signUpCreate: (user: ModelsUserSignUp, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/signUp`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает список звезд, отфильтрованных по заданным параметрам
     *
     * @tags Звезды
     * @name StarList
     * @summary Получить список звезд
     * @request GET:/api/star
     */
    starList: (
      query?: {
        /** Имя */
        name?: string;
        /** Верхняя граница расстояния */
        dist_top?: number;
        /** Нижняя граница расстояния */
        dist_bot?: number;
        /** Верхняя граница возраста */
        age_top?: number;
        /** Нижняя граница возраста */
        age_bot?: number;
        /** Верхняя граница звездной величины */
        mag_top?: number;
        /** Нижняя граница звездной величины */
        mag_bot?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Record<string, any>, Record<string, any>>({
        path: `/api/star`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создает новую звезду с заданными параметрами
     *
     * @tags Звезды
     * @name StarCreate
     * @summary Создать звезду
     * @request POST:/api/star
     */
    starCreate: (
      data: {
        /** Название звезды */
        name: string;
        /** Описание звезды */
        description?: string;
        /** Расстояние до звезды */
        distance?: number;
        /** Возраст звезды */
        age?: number;
        /** Звездная величина */
        magnitude?: number;
        /**
         * Изображение звезды
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/api/star`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description "Удаляет звезду из события по ее ID"
     *
     * @tags Событие-Звезды
     * @name StarEventStarIdDelete
     * @summary "Удалить звезду из события"
     * @request DELETE:/api/star-event/{star-id}
     */
    starEventStarIdDelete: (starId: number, params: RequestParams = {}) =>
      this.request<Record<string, any>, string>({
        path: `/api/star-event/${starId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавляет звезду в событие по ее ID
     *
     * @tags Звезды
     * @name StarEventCreate
     * @summary Добавить звезду в событие
     * @request POST:/api/star/event
     */
    starEventCreate: (
      query: {
        /** ID звезды */
        star_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, string>({
        path: `/api/star/event`,
        method: "POST",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает информацию о звезде по ее ID
     *
     * @tags Звезды
     * @name StarDetail
     * @summary Получить звезду по ID
     * @request GET:/api/star/{id}
     */
    starDetail: (id: number, params: RequestParams = {}) =>
      this.request<ModelsStar, string>({
        path: `/api/star/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаляет существующую звезду по ее ID
     *
     * @tags Звезды
     * @name StarDelete
     * @summary Удалить звезду
     * @request DELETE:/api/star/{id}
     */
    starDelete: (id: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/api/star/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновляет существующую звезду с заданными параметрами
     *
     * @tags Звезды
     * @name StarUpdateUpdate
     * @summary Обновить звезду
     * @request PUT:/api/star/{id}/update
     */
    starUpdateUpdate: (
      id: number,
      data: {
        /** Новое название звезды */
        name?: string;
        /** Новое описание звезды */
        description?: string;
        /** Новое расстояние до звезды */
        distance?: number;
        /** Новый возраст звезды */
        age?: number;
        /** Новая звездная величина */
        magnitude?: number;
        /** Новое изображение звезды */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/api/star/${id}/update`,
        method: "PUT",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
