import jwt_decode from 'jwt-decode';

interface DecodedToken {
  id?: number;
  username?: string;
  iat?: number;
  exp?: number;
}

export const decodeToken = (token: string) => {
  localStorage.setItem('token', token);
  if (!token) return {};
  const { id, username }: DecodedToken = jwt_decode(token);
  localStorage.setItem(
    'authUser',
    JSON.stringify({
      id: id,
      username: username
    })
  );
};
