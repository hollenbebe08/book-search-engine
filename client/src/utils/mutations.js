import { gql } from '@apollo/client';

//login mutation
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


//signup mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//save book mutation
export const SAVE_BOOK = gql`
  mutation saveBook($input: saveBookInput!){
    saveBook(input: $input){
        _id
        username
        email
        bookCount
        savedBooks {
          #_id
          bookId
          authors
          image
          link
          title
          description
        }
    }
  }
`;

//remove book mutation
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!){
    removeBook(bookId: $bookId){
        _id
        username
        email
        bookCount
        savedBooks {
          #_id
          bookId
          authors
          image
          link
          title
          description
        }
    }
  }
`;