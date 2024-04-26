import bcrypt from 'bcrypt';

export async function hashPassword(myPassword) {
  const hash = await bcrypt.hash(myPassword, 10);
  return hash
}

