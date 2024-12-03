import { createContext } from 'react';  // Change this - import from 'react', not 'vm'

// Define the interface for user details
export interface UserDetails {
  credits?: number;  // Making credits optional since it might be undefined
  // Add other user detail fields here as needed
}

export interface UserDetailsContextType {
  userDetails: UserDetails | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

// Create context with type information and default values
export const UserDetailsContext = createContext<UserDetailsContextType>({
  userDetails: null,
  setUserDetails: () => null
});