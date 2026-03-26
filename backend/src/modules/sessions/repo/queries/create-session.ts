/** Types generated for queries found in "src/modules/sessions/repo/queries/create-session.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateSessionRaw' parameters type */
export interface ICreateSessionRawParams {
  routine_id?: string | null | void;
  user_id?: string | null | void;
}

/** 'CreateSessionRaw' return type */
export interface ICreateSessionRawResult {
  id: string;
}

/** 'CreateSessionRaw' query type */
export interface ICreateSessionRawQuery {
  params: ICreateSessionRawParams;
  result: ICreateSessionRawResult;
}

const createSessionRawIR: any = {"usedParamSet":{"user_id":true,"routine_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":50,"b":57}]},{"name":"routine_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":70}]}],"statement":"INSERT INTO sessions(user_id, routine_id) VALUES (:user_id, :routine_id) RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO sessions(user_id, routine_id) VALUES (:user_id, :routine_id) RETURNING id
 * ```
 */
export const createSessionRaw = new PreparedQuery<ICreateSessionRawParams,ICreateSessionRawResult>(createSessionRawIR);


