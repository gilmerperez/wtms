import auth from "../utils/auth";
import { REMOVE_TRUCK } from "../utils/mutations";
import { QUERY_ALL_TRUCKS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";

const Fleet = () => {
  const { loading, data } = useQuery(QUERY_ALL_TRUCKS);
  const userData = data?.getTrucks || [];

  const [removeTruck] = useMutation(REMOVE_TRUCK);

  const handleDeleteTruck = async (e: any, truckId: string) => {
    e.preventDefault();
    console.log(truckId);
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeTruck({
        variables: {
          truckId,
        },
      });

      if (!response.data || !response.data.removeTruck) {
        throw new Error("Something went wrong, please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="container-fluid px-3">
      <h1 className="heading text-center my-4">Fleet Management</h1>

      {/* Fleet Table Section */}
      <div className="section">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Truck ID</th>
                <th>Truck Name</th>
                <th>Truck Capacity</th>
                <th>Driver</th>
                <th>Truck Status</th>
                <th>Truck Warehouse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any) => (
                <tr key={user._id}>
                  <td>{user.truckId}</td>
                  <td>{user.truckName}</td>
                  <td>{user.truckCapacity}</td>
                  <td>{user.driverName}</td>
                  <td>{user.status}</td>
                  <td>{user.assignedWarehouse.name}</td>
                  <td>
                    <button
                      onClick={(e) => handleDeleteTruck(e, user.truckId)}
                      className="btn btn-danger btn-sm"
                    >
                      Remove Truck
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Fleet;