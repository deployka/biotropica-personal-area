import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { ThunkDispatch } from '@reduxjs/toolkit';
import $api from './index';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type BaseQueryFn<
    // eslint-disable-next-line
    Args = any,
    Result = AxiosResponse,
    Error = unknown,
    DefinitionExtraOptions = {
        //
    },
    Meta = {
        //
    }
    > = (
    args: Args,
    api: BaseQueryApi,
    extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

export interface BaseQueryApi {
    signal: AbortSignal
    // eslint-disable-next-line
    dispatch: ThunkDispatch<any, any, any>
    getState: () => unknown
}

export const axiosBaseQuery: BaseQueryFn<
    AxiosRequestConfig,
    AxiosResponse,
    string[]
    > = async args => {
      return await $api.request(args);
    };
