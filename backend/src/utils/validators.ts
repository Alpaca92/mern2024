import { Request, NextFunction, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Email is required'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('password should contian at least 6 characters'),
];

export const signupValidator = [
  ...loginValidator,
  body('name').notEmpty().withMessage('Name is required'),
];
