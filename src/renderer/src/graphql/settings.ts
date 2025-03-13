import { gql } from "@apollo/client";

export const GET_SETTINGS = gql`
  query GetSettings {
    getSettings {
      ip
      port
      apiKey
    }
  }
`;

export const UPDATE_SETTINGS = gql`
  mutation UpdateSettings($ip: String!, $port: String!, $apiKey: String!) {
    updateSettings(ip: $ip, port: $port, apiKey: $apiKey) {
      success
      message
    }
  }
`;
