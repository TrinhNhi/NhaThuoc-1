import { IUserRole } from '@/types/models/IUser';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  id?: number;
  username?: string;
  iat?: number;
  exp?: number;
  Role: IUserRole;
  fullname: string;
}

export const decodeToken = (token: string) => {
  localStorage.setItem('token', token);
  if (!token) return {};
  const { id, username, fullname, Role }: DecodedToken = jwt_decode(token);
  console.log(Role);
  localStorage.setItem(
    'authUser',
    JSON.stringify({
      id: id,
      username: username,
      fullname: fullname,
      role: Role
    })
  );
};
