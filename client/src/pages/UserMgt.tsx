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
      setUsers(data.users);
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
      await addUser({ variables: { input: newUser } });
      setNewUser({ username: "", email: "", password: "", role: "Driver" });
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Editing a user
  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ variables: { id: editUser!._id, input: editUser } });
      setEditUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Deactivating a user
  const handleDeactivateUser = async (userId: string) => {
    try {
      await deactivateUser({ variables: { id: userId } });
    } catch (err) {
      console.error("Error deactivating user:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <main className="container">
      <h1 className="heading">User Management</h1>

      {/* Add New User Section */}
      <div className="section">
        <h2>Add New User</h2>
        <form onSubmit={handleAddUser} className="form">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            className="input"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="input"
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="input"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Driver">Driver</option>
          </select>
          <button type="submit" className="button">
            Add User
          </button>
        </form>
      </div>

      {/* List of Users Section */}
      <div className="section">
        <h2>List of Users</h2>
        <table className="table">
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
                    className="editButton"
                    aria-label={`Edit user ${user.username}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeactivateUser(user._id)}
                    className="deactivateButton"
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

      {/* Edit User Modal */}
      {editUser && (
        <div className="modal">
          <div className="modalContent">
            <h2>Edit User</h2>
            <form onSubmit={handleEditUser} className="form">
              <input
                type="text"
                placeholder="Username"
                value={editUser.username}
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
                className="input"
              />
              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                className="input"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Driver">Driver</option>
              </select>
              <button type="submit" className="button">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="cancelButton"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserMgt;
