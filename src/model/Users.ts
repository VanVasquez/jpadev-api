import { SchemaTypes } from "mongoose";
import MongoDb from "../database";
import { hashPassword } from "../utils";

interface TUser {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
}

const userSchema = new MongoDb.Schema<TUser>(
  {
    email: {type: SchemaTypes.String, required: true, unique: true},
    password: {type: SchemaTypes.String},
    last_name: {type: SchemaTypes.String},
    first_name: {type: SchemaTypes.String},
  }
   , {
    timestamps: true,
    collection: 'User'
  }
)

userSchema.pre<TUser>('save', function (next) {
  const encryptPass = hashPassword(this.password)
  this.password = encryptPass
  next();
})

export default MongoDb.model<TUser>('User', userSchema)