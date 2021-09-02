import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

<<<<<<< HEAD
export const MUTATION_UPDATE_PRODUCTS_COMMENT = gql`
=======
export const MUTATE_UPDATE_PRODUCTS_COMMENT = gql`
>>>>>>> e8118c3d560d07bf5eb07e930a7d87df7087c8b0
  mutation updateProductComment($_id: ID!, $comment: String!) {
    updateProductComment(_id: $_id, comment: $comment) {
      _id
    }
  }
`;
