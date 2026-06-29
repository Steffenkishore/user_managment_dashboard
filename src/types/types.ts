export type UserType = {
  id: number | string;
  firstName: string;
  lastName: string;
  dept?: string;
  name?: string;
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
};

export type InputDataType = {
  action: keyof UserType;
  value: string;
};

export type UserContextType = {
  users: UserType[];
  status: "success" | "loading" | "initial" | "failed";
  error: string;
  fetchUsers: () => Promise<void>;
  addUser: (user: UserType) => Promise<boolean>;
  deleteUserFromState: (id: number | string) => Promise<void>;
  updateUserFromState: (
    id: number | string,
    updateData: UserType,
  ) => Promise<void>;
  setStatus: React.Dispatch<
    React.SetStateAction<"success" | "loading" | "initial" | "failed">
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export type FilterSelectProps = {
  label: string;
  value: string;
  options: (string | undefined)[];
  onChange: (value: string) => void;
};