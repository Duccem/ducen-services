import { gql } from '@apollo/client';
export const LOGIN = gql`
  query login($identifier: String, $password: String) {
    login(identifier: $identifier, password: $password) {
      token
      member {
        id
        nickname
        email
        firstName
        lastName
        biography
        gender
        birthDate
        photo
        phoneNumber
        address {
          city
          country
          direction
          postal
          coordinates {
            longitude
            latitude
          }
        }
        configuration {
          lang
          theme
          timezone
        }
        createdAt
        updatedAt
      }
    }
  }
`;
