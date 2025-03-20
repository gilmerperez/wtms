// import "../styles/UserMgt.css";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { QUERY_USERS } from "../utils/queries";
// import { ADD_USER, UPDATE_USER, DEACTIVATE_USER } from "../utils/mutations";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   role: string;
//   status: string;
// }

// interface UserInput {
//   username: string;
//   email: string;
//   password: string;
//   role: string;
// }

// const UserMgt = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [newUser, setNewUser] = useState<UserInput>({
//     username: "",
//     email: "",
//     password: "",
//     role: "Driver",
//   });
//   const [editUser, setEditUser] = useState<User | null>(null);

//   // Fetch users
//   const { loading, error, data } = useQuery(QUERY_USERS);
//   useEffect(() => {
//     if (data) {
//       setUsers(data.getUsers || []); // Fallback to an empty array if data.getUsers is undefined
//     }
//   }, [data]);

//   // Add user mutation
//   const [addUser] = useMutation(ADD_USER, {
//     refetchQueries: [{ query: QUERY_USERS }],
//     onError: (err) => {
//       alert(`Error adding user: ${err.message}`);
//     },
//   });

//   // Update user mutation
//   const [updateUser] = useMutation(UPDATE_USER, {
//     refetchQueries: [{ query: QUERY_USERS }],
//     onError: (err) => {
//       alert(`Error updating user: ${err.message}`);
//     },
//   });

//   // Deactivate user mutation
//   const [deactivateUser] = useMutation(DEACTIVATE_USER, {
//     refetchQueries: [{ query: QUERY_USERS }],
//     onError: (err) => {
//       alert(`Error deactivating user: ${err.message}`);
//     },
//   });

//   // Adding a new user
//   const handleAddUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newUser.username || !newUser.email || !newUser.password) {
//       alert("Please fill out all fields.");
//       return;
//     }
//     try {
//       await addUser({
//         variables: {
//           username: newUser.username,
//           email: newUser.email,
//           password: newUser.password,
//           role: newUser.role,
//           status: "active", // Default status for new users
//         },
//       });
//       setNewUser({ username: "", email: "", password: "", role: "Driver" });
//     } catch (err) {
//       console.error("Error adding user:", err);
//     }
//   };

//   // Editing a user
//   const handleEditUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editUser) return; // Ensure editUser is not null
//     try {
//       await updateUser({
//         variables: {
//           id: editUser._id,
//           input: {
//             role: editUser.role,
//             status: editUser.status, // Include status if needed
//           },
//         },
//       });
//       setEditUser(null); // Close the modal after successful update
//     } catch (err) {
//       console.error("Error updating user:", err);
//     }
//   };

//   // Deactivating a user
//   const handleDeactivateUser = async (
//     userId: string,
//     currentStatus: string
//   ) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";
//       await deactivateUser({
//         variables: {
//           userId,
//           status: newStatus, // Toggle between "active" and "inactive"
//         },
//       });
//     } catch (err) {
//       console.error("Error updating user status:", err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading users: {error.message}</p>;

//   return (
//     <main className="container">
//       <h1 className="heading">User Management</h1>

//       {/* Add New User Section */}
//       <div className="section">
//         <h2>Add New User</h2>
//         <form onSubmit={handleAddUser} className="form">
//           <input
//             type="text"
//             placeholder="Username"
//             value={newUser.username}
//             onChange={(e) =>
//               setNewUser({ ...newUser, username: e.target.value })
//             }
//             className="input"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             className="input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newUser.password}
//             onChange={(e) =>
//               setNewUser({ ...newUser, password: e.target.value })
//             }
//             className="input"
//           />
//           <select
//             value={newUser.role}
//             onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//             className="input"
//           >
//             <option value="Admin">Admin</option>
//             <option value="Manager">Manager</option>
//             <option value="Driver">Driver</option>
//           </select>
//           <button type="submit" className="button">
//             Add User
//           </button>
//         </form>
//       </div>

//       {/* List of Users Section */}
//       <div className="section">
//         <h2>List of Users</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.username}</td>
//                 <td>{user.role}</td>
//                 <td>{user.status}</td>
//                 <td>
//                   <button
//                     onClick={() => setEditUser(user)}
//                     className="editButton"
//                     aria-label={`Edit user ${user.username}`}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeactivateUser(user._id, user.status)}
//                     className="deactivateButton"
//                     aria-label={`${
//                       user.status === "active" ? "Deactivate" : "Activate"
//                     } user ${user.username}`}
//                   >
//                     {user.status === "active" ? "Deactivate" : "Activate"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit User Modal */}
//       {editUser && (
//         <div className="modal">
//           <div className="modalContent">
//             <h2>Edit User</h2>
//             <form onSubmit={handleEditUser} className="form">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={editUser.username}
//                 onChange={(e) =>
//                   setEditUser({ ...editUser, username: e.target.value })
//                 }
//                 className="input"
//               />
//               <select
//                 value={editUser.role}
//                 onChange={(e) =>
//                   setEditUser({ ...editUser, role: e.target.value })
//                 }
//                 className="input"
//               >
//                 <option value="Admin">Admin</option>
//                 <option value="Manager">Manager</option>
//                 <option value="Driver">Driver</option>
//               </select>
//               <button type="submit" className="button">
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setEditUser(null)}
//                 className="cancelButton"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default UserMgt;

import "../styles/UserMgt.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { ADD_USER, UPDATE_USER, DEACTIVATE_USER } from "../utils/mutations";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

interface UserInput {
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserMgt = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<UserInput>({
    username: "",
    email: "",
    password: "",
    role: "Driver",
  });
  const [editUser, setEditUser] = useState<User | null>(null);

  // Fetch users
  const { loading, error, data } = useQuery(QUERY_USERS);
  useEffect(() => {
    if (data) {
      setUsers(data.getUsers || []); // Fallback to an empty array if data.getUsers is undefined
    }
  }, [data]);

  // Add user mutation
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: QUERY_USERS }],
    onError: (err) => {
      alert(`Error adding user: ${err.message}`);
    },
  });

  // Update user mutation
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: QUERY_USERS }],
    onError: (err) => {
      alert(`Error updating user: ${err.message}`);
    },
  });

  // Deactivate user mutation
  const [deactivateUser] = useMutation(DEACTIVATE_USER, {
    refetchQueries: [{ query: QUERY_USERS }],
    onError: (err) => {
      alert(`Error deactivating user: ${err.message}`);
    },
  });

  // Adding a new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addUser({
        variables: {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          status: "active", // Default status for new users
        },
      });
      setNewUser({ username: "", email: "", password: "", role: "Driver" });
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Editing a user
  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return; // Ensure editUser is not null
    try {
      await updateUser({
        variables: {
          id: editUser._id,
          input: {
            role: editUser.role,
            status: editUser.status, // Include status if needed
          },
        },
      });
      setEditUser(null); // Close the modal after successful update
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Deactivating a user
  const handleDeactivateUser = async (
    userId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await deactivateUser({
        variables: {
          userId,
          status: newStatus, // Toggle between "active" and "inactive"
        },
      });
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <main className="container-fluid px-3">
      <h1 className="heading text-center my-4">User Management</h1>

      {/* Add New User Section */}
      <div className="section">
        <h2 className="mb-3">Add New User</h2>
        <form onSubmit={handleAddUser} className="form row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="form-select"
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Driver">Driver</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* List of Users Section */}
      <div className="section mt-5">
        <h2 className="mb-3">List of Users</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button
                      onClick={() => setEditUser(user)}
                      className="btn btn-warning btn-sm mx-1"
                      aria-label={`Edit user ${user.username}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeactivateUser(user._id, user.status)}
                      className="btn btn-danger btn-sm mx-1"
                      aria-label={`${
                        user.status === "active" ? "Deactivate" : "Activate"
                      } user ${user.username}`}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editUser && (
        <div className="modal show" tabIndex={-1} aria-labelledby="editUserModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editUserModalLabel">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditUser(null)}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleEditUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Username"
                      value={editUser.username}
                      onChange={(e) =>
                        setEditUser({ ...editUser, username: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      value={editUser.role}
                      onChange={(e) =>
                        setEditUser({ ...editUser, role: e.target.value })
                      }
                      className="form-select"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Driver">Driver</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditUser(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserMgt;
