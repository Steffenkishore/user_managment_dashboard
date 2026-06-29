import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { Routes, Route } from "react-router-dom";
import ViewUser from "./components/ViewUser";
import EditForm from "./components/EditForm";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-100">
              <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
                  User Management Dashboard
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4">
                    <UserForm />
                  </div>

                  <div className="lg:col-span-8">
                    <UserList />
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <Route path="/user/:id" element={<ViewUser />} />

        <Route path="/user/edit/:id" element={<EditForm />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
