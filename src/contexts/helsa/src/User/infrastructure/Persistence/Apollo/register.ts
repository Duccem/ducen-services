import { gql } from '@apollo/client';
export const REGISTER = gql`
  mutation userRegister($user: UserRegister) {
    userRegister(user: $user)
  }
`;
