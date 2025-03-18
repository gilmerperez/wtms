import "./UserMgt.css";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

interface NewUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

const [users, setUsers] = useState<User[]>([]);
const [newUser, setNewUser] = useState<NewUser>({
  username: "",
  email: "",
  password: "",
  role: "Driver",
});
const [editUser, setEditUser] = useState<User | null>(null);

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

const { loading, error, data } = useQuery(QUERY_USERS);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error loading users: {error.message}</p>;

const UserMgt = () => {
  return (
    <main>
      <h1>User Management</h1>
    </main>
  );
};

export default UserMgt;
