export class  AppError {
  constructor(public originalError?: any) {}

  public getErrorMessage(): string {
    if ( this.originalError) {
      return this.originalError.error.message;
    }
  }
}
