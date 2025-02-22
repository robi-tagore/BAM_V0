interface Customer {
  name: { first?: string; last?: string; surname?: string };
  physicalIdentity: string[];
  virtualIdentity: {
    phoneNumber?: string;
    emergencyNumber?: string;
    email?: string;
  };
  uniqueIdentity: string;
}
