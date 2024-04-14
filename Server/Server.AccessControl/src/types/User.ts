import { ObjectId } from "mongoose";

export type User = {
  name: string;
  email: string;
  password: string;
  _id: ObjectId;
};
