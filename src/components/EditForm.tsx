import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import type { UserType } from "../types/types";
import { toast } from "react-toastify";
import Loading from "./Loading";

const EditForm = () => {
  const { id } = useParams<string>();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("EditForm must be used inside UserProvider");
  }

  const { users, updateUserFromState, status, setStatus, setError } = context;

  const [oneUser, setOneUser] = useState<UserType | undefined>();
  const [formData, setFormData] = useState<UserType | undefined>();

  useEffect(() => {
    setStatus("loading");
    const data = users.find((user) => user.id?.toString() === id?.toString());
    setOneUser(data);
    setStatus("success");
  }, [users, id]);

  useEffect(() => {
    setStatus("loading");
    if (oneUser) {
      setFormData(oneUser);
      setStatus("success")
    } else {
      setError("cannot load user data");
    }
  }, [oneUser]);
  console.log(status);

  const handleChange = (field: string, value: string) => {
    if (!formData) return;

    switch (field) {
      case "street":
      case "suite":
      case "city":
      case "zipcode":
        setFormData({
          ...formData,
          address: {
            ...formData.address,
            [field]: value,
          },
        });
        break;

      case "lat":
      case "lng":
        if (formData.address) {
          setFormData({
            ...formData,
            address: {
              ...formData.address,
              geo: {
                ...formData.address.geo,
                [field]: value,
              },
            },
          });
          break;
        }
      case "companyName":
        setFormData({
          ...formData,
          company: {
            ...formData.company,
            name: value,
          },
        });
        break;

      case "catchPhrase":
        setFormData({
          ...formData,
          company: {
            ...formData.company,
            catchPhrase: value,
          },
        });
        break;

      case "bs":
        setFormData({
          ...formData,
          company: {
            ...formData.company,
            bs: value,
          },
        });
        break;

      default:
        setFormData({
          ...formData,
          [field]: value,
        });
    }
  };

  if (!formData || status === "loading") return <Loading />;

  const handleReset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    setFormData(oneUser);
    toast.success("Data has been reseted!");
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateUserFromState(id ?? "", formData);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 my-10"
    >
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Edit User</h2>

        <Link
          to="/"
          className="px-5 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-800 transition"
        >
          Back
        </Link>
      </div>
      <div className="bg-slate-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-slate-700">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block mb-2 font-medium text-slate-700">Name</label>
          <input
            type="text"
            value={formData.name ?? "Enter New Data....."}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <label className="block mb-2 font-medium text-slate-700">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName ?? "Enter New Data....."}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <label className="block mb-2 font-medium text-slate-700">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName ?? "Enter New Data....."}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <label className="block mb-2 font-medium text-slate-700">
            Username
          </label>
          <input
            type="text"
            value={formData.username ?? "Enter New Data....."}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <label className="block mb-2 font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={formData.email ?? "Enter New Data....."}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <label className="block mb-2 font-medium text-slate-700">Phone</label>
          <input
            type="text"
            value={formData.phone ?? "Enter New Data....."}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <label className="block mb-2 font-medium text-slate-700">
            Website
          </label>
          <input
            type="text"
            value={formData.website ?? "Enter New Data....."}
            onChange={(e) => handleChange("website", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-slate-700">
              Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block mb-2 font-medium text-slate-700">
                Street
              </label>
              <input
                type="text"
                value={formData.address?.street ?? "Enter New Data....."}
                onChange={(e) => handleChange("street", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                Suite
              </label>
              <input
                type="text"
                value={formData.address?.suite ?? "Enter New Data....."}
                onChange={(e) => handleChange("suite", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                City
              </label>
              <input
                type="text"
                value={formData.address?.city ?? "Enter New Data....."}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                Zipcode
              </label>
              <input
                type="text"
                value={formData.address?.zipcode ?? "Enter New Data....."}
                onChange={(e) => handleChange("zipcode", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                Latitude
              </label>
              <input
                type="text"
                value={formData.address?.geo?.lat ?? "Enter New Data....."}
                onChange={(e) => handleChange("lat", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                Longitude
              </label>
              <input
                type="text"
                value={formData.address?.geo?.lng ?? "Enter New Data....."}
                onChange={(e) => handleChange("lng", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-slate-700">
              Company
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block mb-2 font-medium text-slate-700">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company?.name ?? "Enter New Data....."}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                Catch Phrase
              </label>
              <input
                type="text"
                value={formData.company?.catchPhrase ?? "Enter New Data....."}
                onChange={(e) => handleChange("catchPhrase", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <label className="block mb-2 font-medium text-slate-700">
                BS
              </label>
              <input
                type="text"
                value={formData.company?.bs ?? "Enter New Data....."}
                onChange={(e) => handleChange("bs", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-4 pt-6 border-t">
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
        >
          Back
        </Link>

        <button
          type="button"
          onClick={(e) => handleReset(e)}
          className="px-6 py-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
        >
          Reset
        </button>

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Update User
        </button>
      </div>
    </form>
  );
};

export default EditForm;
