export interface ISingleJwt {
  secret: string;
  time: number;
}

export interface IAuthJwt {
  publicKey: string;
  privateKey: string;
  time: number;
}

export interface IJwt {
  access: IAuthJwt;
  confirmation: ISingleJwt;
  resetPassword: ISingleJwt;
  refresh: IAuthJwt;
}
