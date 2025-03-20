import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $role: String!, $status: String!) {
    addUser(username: $username, email: $email, password: $password, role: $role, status: $status) {
      token
      user {
        _id
        username
        email
        role
        status
      }
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

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
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

export const ADD_WAREHOUSE = gql`
  mutation AddWarehouse($name: String!, $location: String!, $capacity: Int!, $items: [ItemInput]) {
    addWarehouse(name: $name, location: $location, capacity: $capacity, items: $items) {
      _id
      name
      location
      capacity
      items {
        itemName
        quantity
        arrivalDate
      }
    }
  }
`;

export const UPDATE_WAREHOUSE = gql`
  mutation UpdateWarehouse($id: ID!, $input: WarehouseInput!) {
    updateWarehouse(id: $id, input: $input) {
      _id
      name
      location
      capacity
      items {
        itemName
        quantity
        arrivalDate
      }
    }
  }
`;

export const DELETE_WAREHOUSE = gql`
  mutation DeleteWarehouse($id: ID!) {
    deleteWarehouse(id: $id) {
      _id
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddItem($warehouseId: ID!, $itemName: String!, $quantity: Int!, $arrivalDate: String!) {
    addItem(warehouseId: $warehouseId, itemName: $itemName, quantity: $quantity, arrivalDate: $arrivalDate) {
      _id
      items {
        itemName
        quantity
        arrivalDate
      }
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($warehouseId: ID!, $itemId: ID!, $input: ItemInput!) {
    updateItem(warehouseId: $warehouseId, itemId: $itemId, input: $input) {
      _id
      items {
        itemName
        quantity
        arrivalDate
      }
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($warehouseId: ID!, $itemId: ID!) {
    deleteItem(warehouseId: $warehouseId, itemId: $itemId) {
      _id
      items {
        itemName
        quantity
        arrivalDate
      }
    }
  }
`;