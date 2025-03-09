export type LocationType = {
  locationName: string;
  description: string;
  locationPin: string;
};

export type LocationWithIdType = LocationType & {
  id: string;
};

export type AttendanceDeviceType = {
  deviceName: string;
  ipAddress: string;
  port: string;
  serialNumber: string;
  locationRef: string;
};

export type SettingsType = {
  ipOrDomain: string;
  port: string;
  apiKey: string;
};
