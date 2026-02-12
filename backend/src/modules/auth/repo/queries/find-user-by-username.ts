/** Types generated for queries found in "src/modules/auth/repo/queries/find-user-by-username.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByUsernameRaw' parameters type */
export interface IFindUserByUsernameRawParams {
  username?: string | null | void;
}

/** 'FindUserByUsernameRaw' return type */
export interface IFindUserByUsernameRawResult {
  email: string;
  id: string;
  password_hash: string;
  username: string;
}

/** 'FindUserByUsernameRaw' query type */
export interface IFindUserByUsernameRawQuery {
  params: IFindUserByUsernameRawParams;
  result: IFindUserByUsernameRawResult;
}

const findUserByUsernameRawIR: any = {"usedParamSet":{"username":true},"params":[{"name":"username","required":false,"transform":{"type":"scalar"},"locs":[{"a":70,"b":78}]}],"statement":"SELECT id, email, username, password_hash FROM users WHERE username = :username"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, username, password_hash FROM users WHERE username = :username
 * ```
 */
export const findUserByUsernameRaw = new PreparedQuery<IFindUserByUsernameRawParams,IFindUserByUsernameRawResult>(findUserByUsernameRawIR);


