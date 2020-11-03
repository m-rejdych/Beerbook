export default interface ErrorType extends Error {
  statusCode?: number;
  data?: any;
}
