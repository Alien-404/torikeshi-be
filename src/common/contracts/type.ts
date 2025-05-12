export interface CustomError extends Error {
  status?: number;
  cause?: {
    message?: string;
  };
}
