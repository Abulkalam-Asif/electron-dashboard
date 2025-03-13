import { gql } from '@apollo/client'

export const GET_ALL_LOCATIONS = gql`
  query GetAllLocations {
    getAllLocations {
      id
      name
      description
      pin
    }
  }
`

export const ADD_NEW_LOCATION = gql`
  mutation AddNewLocation($name: String!, $description: String!, $pin: String!) {
    addNewLocation(name: $name, description: $description, pin: $pin)
  }
`

export const EDIT_LOCATION = gql`
  mutation EditLocation($id: ID!, $name: String!, $description: String!, $pin: String!) {
    editLocation(id: $id, name: $name, description: $description, pin: $pin)
  }
`

export const DELETE_LOCATION = gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id)
  }
`
