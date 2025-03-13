import { gql } from "@apollo/client";

export const GET_ATTENDANCE_DEVICES = gql`
  query GetAttendanceDevices {
    getAttendanceDevices {
      id
      name
      ip
      port
      serialNumber
      locationRef {
        id
        name
        description
        pin
      }
    }
  }
`;

export const ADD_ATTENDANCE_DEVICE = gql`
  mutation AddAttendanceDevice(
    $name: String!
    $ip: String!
    $port: String!
    $serialNumber: String!
    $locationId: ID!
  ) {
    addAttendanceDevice(
      name: $name
      ip: $ip
      port: $port
      serialNumber: $serialNumber
      locationId: $locationId
    ) {
      id
      name
      ip
      port
      serialNumber
      locationRef {
        id
        name
        description
        pin
      }
    }
  }
`;

export const EDIT_ATTENDANCE_DEVICE = gql`
  mutation EditAttendanceDevice(
    $id: ID!
    $name: String!
    $ip: String!
    $port: String!
    $serialNumber: String!
    $locationId: ID!
  ) {
    editAttendanceDevice(
      id: $id
      name: $name
      ip: $ip
      port: $port
      serialNumber: $serialNumber
      locationId: $locationId
    ) {
      id
      name
      ip
      port
      serialNumber
      locationRef {
        id
        name
        description
        pin
      }
    }
  }
`;

export const DELETE_ATTENDANCE_DEVICE = gql`
  mutation DeleteAttendanceDevice($id: ID!) {
    deleteAttendanceDevice(id: $id)
  }
`;
