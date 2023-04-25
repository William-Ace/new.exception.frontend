import { gql } from '@apollo/client';

const RegisterUser = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      _id
    }
  }
`;

export { RegisterUser };
