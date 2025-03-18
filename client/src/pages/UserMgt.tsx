import "./UserMgt.css";

const handleAddUser = async (e) => {
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

const UserMgt = () => {
  return (
    <main>
      <h1>User Management</h1>
    </main>
  );
};

export default UserMgt;
