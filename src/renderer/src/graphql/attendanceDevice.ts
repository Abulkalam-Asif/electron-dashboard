import { gql } from "@apollo/client";

export const GET_ATTENDANCE_DEVICES = gql`
  query getAllAttendanceDevices {
    getAllAttendanceDevices {
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
  mutation addNewAttendanceDevice(
    $name: String!
    $ip: String!
    $port: String!
    $serialNumber: String!
    $locationId: ID!
  ) {
    addNewAttendanceDevice(
      name: $name
      ip: $ip
      port: $port
      serialNumber: $serialNumber
      locationId: $locationId
    ) {
      success
      message
      attendanceDevice {
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
