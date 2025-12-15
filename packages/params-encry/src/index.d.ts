export interface ParamsEncryOptions {
  SIGN_HEADER?: string;
  TIMESTAMP_HEADER?: string;
  NONCE_HEADER?: string;
  APP_SECRET?: string;
  ignore?: string[];
}

export declare class ParamsEncry {
  SIGN_HEADER: string;
  TIMESTAMP_HEADER: string;
  NONCE_HEADER: string;
  APP_SECRET: string;
  ignore: string[];

  constructor(options?: ParamsEncryOptions);
  init(): void;
}