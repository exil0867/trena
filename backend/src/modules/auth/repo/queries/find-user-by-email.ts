/** Types generated for queries found in "src/modules/auth/repo/queries/find-user-by-email.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByEmailRaw' parameters type */
export interface IFindUserByEmailRawParams {
  email?: string | null | void;
}

/** 'FindUserByEmailRaw' return type */
export interface IFindUserByEmailRawResult {
  email: string;
  id: string;
  password_hash: string;
  username: string;
}

/** 'FindUserByEmailRaw' query type */
export interface IFindUserByEmailRawQuery {
  params: IFindUserByEmailRawParams;
  result: IFindUserByEmailRawResult;
}

const findUserByEmailRawIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":67,"b":72}]}],"statement":"SELECT id, email, username, password_hash FROM users WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, username, password_hash FROM users WHERE email = :email
 * ```
 */
export const findUserByEmailRaw = new PreparedQuery<IFindUserByEmailRawParams,IFindUserByEmailRawResult>(findUserByEmailRawIR);


