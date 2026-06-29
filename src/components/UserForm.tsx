import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import type { InputDataType, UserType } from "../types/types";
import { toast } from "react-toastify";
import Loading from "./Loading";

const initialUserData: UserType = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  dept: "",
};

const UserForm = () => {
  const [user, setUser] = useState<UserType>(initialUserData);
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserForm must be used inside UserProvider");
  }

  const { addUser, status, setStatus, setError } = context;

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const { firstName, lastName, email, dept } = user;

    if (firstName == "" || lastName == "" || email == "" || dept == "") {
      setStatus("failed");
      setError("All fields are required!");
      toast.error("All fields are required!");
      return;
    }

    setStatus("loading");

    try {
      const success = await addUser(user);

      if (success) {
        setStatus("success");
        setUser(initialUserData);
        setError("");
        
      } else {
        setError("Data not added");
        setStatus("failed");
      }
    } catch (e) {
      setStatus("failed");
      setError("Something went wrong.");

      toast.error("Something went wrong.");
    }
  };

  const handleInputs = ({ action, value }: InputDataType): void => {
    setUser((prev) => ({ ...prev, [action]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Add User
      </h2>

      { status === "loading" ? <Loading /> :
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          onChange={(e) =>
            handleInputs({
              action: "firstName",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          onChange={(e) =>
            handleInputs({
              action: "lastName",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={user.email}
          onChange={(e) =>
            handleInputs({
              action: "email",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />

        <input
          type="text"
          placeholder="Department"
          value={user.dept}
          onChange={(e) =>
            handleInputs({
              action: "dept",
              value: e.target.value,
            })
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          Add User
        </button>
      </form>}
    </div>
  );
};

export default UserForm;
