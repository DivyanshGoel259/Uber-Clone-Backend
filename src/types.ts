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
  createdAt: Date;
  updatedAt: Date;
}
