import bcrypt, { genSaltSync } from 'bcrypt'; 

type Password = string;
/**
 * 
 * @param password 
 * @returns hased password
 */
export function hashPassword (password: Password): Password {
  return bcrypt.hashSync(password, genSaltSync(10));
}

/**
 * 
 * @param password 
 * @param hash 
 * @returns boolean
 */
export function comparePassword (password: Password, hash: Password): boolean {
  return bcrypt.compareSync(password, hash);
}
