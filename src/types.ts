export interface AuthResponse {
  data?: any;
  error?: {
    message: string;
  };
}

export interface UserType {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  socketId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LocationType = {
  id: string;
  lat: number;
  lng: number;
};

export type TypeVehicle = {
  id: string;
  color: string;
  plate: string;
  capacity: number;
  type: VehicleType;
};

export type CaptainType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: CaptainStatus;
  locationId: string;
  vehicleId: string;
  createdAt: Date;
  updatedAt: Date;
  location: LocationType;
  vehicle: TypeVehicle;
};

export enum CaptainStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum VehicleType {
  MOTORCYCLE = "motorcycle",
  CAR = "car",
  AUTO = "auto",
}
