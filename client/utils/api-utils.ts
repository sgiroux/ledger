import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApi } from '../api-client';
import { logger } from './logger';

class AnzuAPIError {
  private httpStatus: number;
  private code: number;
  private message: string;

  constructor(httpStatus: number, code: number, message: string) {
    this.httpStatus = httpStatus;
    this.code = code;
    this.message = message;
  }

  public getHttpStatus(): number {
    return this.httpStatus;
  }

  public getError(): { code: number; message: string } {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export const handleAPIError = (res: NextApiResponse, err: any) => {
  logger.log(`An Error Has Occured: ${err}`);
  if (err instanceof AnzuAPIError) {
    res.status(err.getHttpStatus()).json(err.getError());
  } else {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
};

export const createDefaultAPI = (req: NextApiRequest) => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjEzODc0ODAsImV4cCI6MTY2MTk5MjI4MH0.FG3V-vKKGcl-KkTSSrKGsqrozpiFynNpZqz3p3Ty8Uk`,
    },
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return Promise.reject(
          new AnzuAPIError(
            error.response.status,
            error.response.data['statusCode'],
            error.response.data['message'],
          ),
        );
      } else {
        return Promise.reject<AnzuAPIError>(
          new AnzuAPIError(500, 500, 'Internal Server Error'),
        );
      }
    },
  );

  return new DefaultApi({}, 'http://127.0.0.1:5000', axiosInstance);
};
