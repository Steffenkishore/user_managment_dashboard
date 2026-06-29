import { createContext, useEffect, useState } from "react";
import type { UserContextType, UserType } from "../types/types";
import { getUsers } from "../services/getUsers.service";
import { createUser } from "../services/addUser.service";
import { v4 as uuidv4 } from "uuid";
import { delUser } from "../services/delUser.service";
import { updateUser } from "../services/updateUser.service";
import { toast } from "react-toastify";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [status, setStatus] = useState<
    "success" | "loading" | "initial" | "failed"
  >("initial");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setStatus("loading");
    const response = await getUsers();

    if (response.status === 200) {
      try {
        const nameChangedData = response.data.map((e: Partial<UserType>) => {
          if (e.name !== undefined) {
            const nameList = e.name.trim().split(" ");

            let nameObj = {
              firstName: nameList[0] ?? "",
              lastName: nameList.slice(1).join(" "),
            };

            const invalidFName =
              nameList[0].toLowerCase().startsWith("mr") ||
              nameList[0].toLowerCase().startsWith("ms") ||
              nameList[0].length <= 1;

            if (invalidFName) {
              nameObj = {
                firstName: nameList[1] ?? "",
                lastName: nameList.slice(2).join(" "),
              };
            }
          
            return { ...e, ...nameObj };
          } else {
            return e;
          }
        });
        setStatus("success");
        setUsers(nameChangedData);
      } catch (err) {
        setStatus("failed");
        setError("something went wrong");
        console.log(err);
      }
    }
  };

  const addUser = async (user: UserType) => {
    const response = await createUser(user);

    if (response.status === 201) {
        const newData = {...response.data, id: uuidv4()}
      setUsers((prev) => [...prev, newData]);
      toast.success("User added successfully!");
      return true;
    }

    return false;
    toast.error("Failed to add user.");
  };

  const deleteUserFromState = async (id: number | string) => {
    setStatus("loading");
    await delUser(id);
    let deletedUserState = users.filter((each) => each.id !== id);
    setUsers(deletedUserState)
    setStatus("success");
    toast.success("User Has been Deleted!");
  }

 const updateUserFromState = async (id: number | string, updateData: UserType) => {
   setStatus("loading");
   const response = await updateUser(id, updateData);

   if (response.status === 200) {
     setUsers((prev) =>
       prev.map((each) => (each.id.toString() === id.toString() ? updateData : each)),
     );
     setStatus("success");
     toast.success("User Data Edited Successfully!");
     return;
   }
   setStatus("failed");
   setError("Something went wrong!");
   toast.error("Something went wrong!");
 };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        status,
        error,
        fetchUsers,
        addUser,
        deleteUserFromState,
        updateUserFromState,
        setStatus,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
