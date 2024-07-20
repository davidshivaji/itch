export interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  errors?: string[];
}
