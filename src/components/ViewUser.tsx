import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { UserType } from "../types/types";
import { UserContext } from "../context/UserContext";

const ViewUser = () => {
  const { id } = useParams();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserList must be used inside UserProvider");
  }

  const { users } = context;

  const [oneUser, setOneUser] = useState<UserType | undefined>();

  useEffect(() => {
    const data = users.find((user) => user.id?.toString() === id?.toString());
    setOneUser(data);
  }, [users, id]);

  const userDetails = [
    { label: "First Name", value: oneUser?.firstName },
    { label: "Last Name", value: oneUser?.lastName },
    { label: "Username", value: oneUser?.username },
    { label: "Email", value: oneUser?.email },
    { label: "Department", value: oneUser?.dept },
    { label: "Phone", value: oneUser?.phone },
    { label: "Website", value: oneUser?.website },
    { label: "Company", value: oneUser?.company?.name },
  ];

  const displayValue = (value?: string) => value || "No Data Present";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">User Details</h1>

            <p className="text-gray-500 mt-1">
              Complete information about the selected user.
            </p>
          </div>

          <Link
            to="/"
            className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-800 transition"
          >
            ← Back
          </Link>
        </div>

        {/* Personal Details */}

        <div className="bg-slate-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userDetails.map(({ label, value }) => (
              <div key={label} className="border rounded-lg bg-white p-4">
                <p className="text-sm text-gray-500 mb-1">{label}</p>

                <p className="font-semibold text-slate-800 wrap-break-word">
                  {displayValue(value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}

        <div className="bg-slate-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-6">Address</h2>

          <div className="border rounded-lg bg-white p-5">
            <p className="text-gray-500 mb-2">Full Address</p>

            <p className="font-medium text-slate-800">
              {oneUser?.address
                ? `${oneUser.address.street ?? ""}, ${oneUser.address.suite ?? ""}, ${oneUser.address.city ?? ""}, ${oneUser.address.zipcode ?? ""}`
                : "No Data Present"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
