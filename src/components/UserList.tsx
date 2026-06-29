import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import type { UserType } from "../types/types";
import FilterSelect from "./FilterSelect";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Loading from "./Loading";




const UserList = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserList must be used inside UserProvider");
  }

  const { users, deleteUserFromState, status } = context;

  const [search, setSearch] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    dept: "",
  });

  const [sortBy, setSortBy] = useState("");

  const getUniqueValues = (key: "firstName" | "lastName" | "dept") => {
    return [...new Set(users.map((user) => user[key]))];
  };

  const uniqueFirstNames = getUniqueValues("firstName");
  const uniqueLastNames = getUniqueValues("lastName");
  const uniqueDept = getUniqueValues("dept");

  let filteredUsers: UserType[] = users;

  if (search !== null && search !== "") {
    filteredUsers = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }

  filteredUsers = filteredUsers.filter((user) => {
    return (
      (filters.firstName === "" || user.firstName === filters.firstName) &&
      (filters.lastName === "" || user.lastName === filters.lastName) &&
      (filters.dept === "" || user.dept === filters.dept)
    );
  });

  const handleFilterChange = (
    key: "firstName" | "lastName" | "dept",
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  let sortedUsers = [...filteredUsers];

  switch (sortBy) {
    case "firstName-asc":
      sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      break;

    case "firstName-desc":
      sortedUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
      break;

    case "lastName-asc":
      sortedUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
      break;

    case "lastName-desc":
      sortedUsers.sort((a, b) => b.lastName.localeCompare(a.lastName));
      break;
  }

  const clearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      dept: "",
    });

    setSortBy("");
    setSearch("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="border rounded-lg p-3 mb-4 bg-amber-500">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl  font-bold text-slate-800 mb-6 self-center">
            Filters
          </h2>
          <button
            onClick={clearFilters}
            className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-800 transition"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
          <input
            type="search"
            placeholder="Search user..."
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            className="xl:col-span-2 rounded-lg border bg-white border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />

          <FilterSelect
            label="First Name"
            value={filters.firstName}
            options={uniqueFirstNames}
            onChange={(value) => handleFilterChange("firstName", value)}
          />

          <FilterSelect
            label="Last Name"
            value={filters.lastName}
            options={uniqueLastNames}
            onChange={(value) => handleFilterChange("lastName", value)}
          />

          <FilterSelect
            label="Department"
            value={filters.dept}
            options={uniqueDept}
            onChange={(value) => handleFilterChange("dept", value)}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border bg-white border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          >
            <option value="">No Sorting</option>
            <option value="firstName-asc">First Name (A-Z)</option>
            <option value="firstName-desc">First Name (Z-A)</option>
            <option value="lastName-asc">Last Name (A-Z)</option>
            <option value="lastName-desc">Last Name (Z-A)</option>
          </select>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        User List
      </h2>

      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="space-y-5 h-[48vh] rounded-lg border overflow-auto scroll-smooth scrollbar-thin ">
          {sortedUsers.length > 0 ? (
            sortedUsers.map((each) => (
              <div
                key={each.id}
                className="rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs uppercase text-gray-500">
                      First Name
                    </p>

                    <p className="font-semibold text-slate-700">
                      {each.firstName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-500">Last Name</p>

                    <p className="font-semibold text-slate-700">
                      {each.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-500">Email</p>

                    <p className="break-all text-slate-700">{each.email}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-500">Phone</p>

                    <p className="text-slate-700">{each.phone ?? "No data"}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-500">
                      Department
                    </p>

                    <p className="text-slate-700">{each.dept ?? "No data"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <Link
                    to={`/user/${each.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                  >
                    <FaRegEye />
                  </Link>

                  <Link
                    to={`/user/edit/${each.id}`}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 transition"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => deleteUserFromState(each.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No users found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default UserList;
