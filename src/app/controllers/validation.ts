import { Request, Response, NextFunction } from "express";

class ErrorBody extends Error {
  public fields: any

  public constructor(message: string, fields: any) {
    super(message)
    Error.captureStackTrace(this, this.constructor);
    this.fields = fields

    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';
  }
}

class Validation {

  public valida = (body: any, fields: string[]) => {
    let errors: { field: string; message: string; }[] = []
    fields.forEach(field => {
      if (!body[field]) {
        errors.push({ field, message: `O campo ${field} é obrigatório` })
      }
    });
    if (errors.length > 0) {
      throw new ErrorBody('BodRequestError', errors);
    }
  }
}

export const validation = new Validation()