/** Types generated for queries found in "src/modules/bodyweight/repo/queries/add-bodyweight.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'AddBodyweightRaw' parameters type */
export interface IAddBodyweightRawParams {
  user_id?: string | null | void;
  weight?: number | null | void;
}

/** 'AddBodyweightRaw' return type */
export interface IAddBodyweightRawResult {
  id: string;
}

/** 'AddBodyweightRaw' query type */
export interface IAddBodyweightRawQuery {
  params: IAddBodyweightRawParams;
  result: IAddBodyweightRawResult;
}

const addBodyweightRawIR: any = {"usedParamSet":{"user_id":true,"weight":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":55}]},{"name":"weight","required":false,"transform":{"type":"scalar"},"locs":[{"a":58,"b":64}]}],"statement":"INSERT INTO bodyweight(user_id, weight) VALUES (:user_id, :weight) RETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO bodyweight(user_id, weight) VALUES (:user_id, :weight) RETURNING id
 * ```
 */
export const addBodyweightRaw = new PreparedQuery<IAddBodyweightRawParams,IAddBodyweightRawResult>(addBodyweightRawIR);


