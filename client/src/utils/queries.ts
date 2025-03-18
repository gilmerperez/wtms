import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      role
      status
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      role
      status
      }
    }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      role
      status
    }
  }
`;

export const QUERY_WAREHOUSE = gql`
  query warehouse($warehouseId: ID!) {
    me {
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

export const QUERY_ALL_WAREHOUSES = gql`
  query getWarehouses {
    getWarehouses {
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

export const QUERY_TRUCK = gql`
  query truck($truckId: ID!) {
    me {
      _id
      truckId
      truckName
      truckCapacity
      driverName
      status
      assignedWarehouse
    }
  }
`;

export const QUERY_ALL_TRUCKS = gql`
  query getTrucks {
    getTrucks {
      _id
      truckId
      truckName
      truckCapacity
      driverName
      status
      assignedWarehouse
    }
  }
`;
