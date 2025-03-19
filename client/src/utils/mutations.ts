import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      # user {
      #   _id
      #   username
      # }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $role: String!, $status: String!) {
    addUser(username: $username, email: $email, password: $password, role: $role, status: $status) {
      _id
      username
      email
      role
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      _id
      username
      email
      role
      status
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation DeactivateUser($userId: ID!, $status: String!) {
    updateUserStatus(userId: $userId, status: $status) {
      _id
      status
    }
  }
`;

export const REMOVE_TRUCK = gql`
mutation deleteTruck($truckId: String!){
deleteTruck(truckId: $truckId){
  _id
  }
}
`;
