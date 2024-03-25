
export class ErrorWithStatus extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends ErrorWithStatus {
  constructor(message?: string) {
    super(message || 'Not Found', 404);
  }
}

export class BadRequestError extends ErrorWithStatus {
  constructor(message?: string) {
    super(message || 'Bad request', 400);
  }
}
