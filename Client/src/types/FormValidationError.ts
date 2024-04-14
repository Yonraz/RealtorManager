import { ZodError } from "zod";
export type FormValidationError = ZodError<{
  issues: {
    [key: string]: { message: string }[];
  };
  name: string[];
  email: string[];
  password: string[];
}>;
