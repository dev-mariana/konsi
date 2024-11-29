export class ResourceNotFoundError extends Error {
  constructor(resource?: string) {
    resource ? super('Resource not found.') : super(`${resource} not found.`);
  }
}
