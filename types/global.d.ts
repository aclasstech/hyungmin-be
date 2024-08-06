declare global {
  interface IAuthUser {
    id: string | number;
    pv: number;
    exp?: number;
    iat?: number;
    role?: string | number;
  }

  export interface IBaseResponse<T = any> {
    message: string;
    code: string | number;
    data?: T;
  }

  export interface IListRespData<T = any> {
    items: T[];
  }
}

export {};
