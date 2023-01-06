export interface Result<T = string> {
  code: number;
  message: string;
  result?: T;
}
