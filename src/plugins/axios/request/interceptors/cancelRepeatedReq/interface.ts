import { CreateAxiosOptions } from "../../types";

export type GenerateReqKeyData = Pick<CreateAxiosOptions, "baseURL" | "url" | "method" | "params" | "data"> & { needCancel?: boolean };
