/** Types generated for queries found in "src/modules/auth/repo/queries/find-user-by-id.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByIdRaw' parameters type */
export interface IFindUserByIdRawParams {
  id?: string | null | void;
}

/** 'FindUserByIdRaw' return type */
export interface IFindUserByIdRawResult {
  email: string;
  id: string;
  password_hash: string;
  username: string;
}

/** 'FindUserByIdRaw' query type */
export interface IFindUserByIdRawQuery {
  params: IFindUserByIdRawParams;
  result: IFindUserByIdRawResult;
}

const findUserByIdRawIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":66}]}],"statement":"SELECT id, email, username, password_hash FROM users WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, username, password_hash FROM users WHERE id = :id
 * ```
 */
export const findUserByIdRaw = new PreparedQuery<IFindUserByIdRawParams,IFindUserByIdRawResult>(findUserByIdRawIR);


