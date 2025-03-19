import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_TRUCKS } from "../utils/queries";
import { REMOVE_TRUCK } from "../utils/mutations";
import auth from "../utils/auth";
const Fleet = () => {

  const { loading, data } = useQuery(QUERY_ALL_TRUCKS)
  //VERIFY IF THE .TRUCKS PART IS TOTALLY NECESSARY
  const userData = data?.getTrucks || []

  const [removeTruck] = useMutation(REMOVE_TRUCK)

  const handleDeleteTruck = async (e: any, truckId: string) => {
    e.preventDefault()
    console.log(truckId)
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeTruck({
        variables: {
          truckId
        }
      });

      if (!response.data || !response.data.removeTruck) {
        throw new Error('Something went wrong, please try again.')
      }
      // removeTruck(userData.truckId)
    }
    catch (err) {
      console.error(err)
    }
  };

  if (loading) {
    return <h2>Loading...</h2>
  }

  //I NEED TO ACCESS THE SEED DATA/DATABASE TO BE ABLE TO EXTRACT THAT DATA AND APPLY IT TO MY TABLE
  //
  // const tableRow =
  console.log(userData)
  return (
    <main>
      <h1>Fleet Management</h1>
      <table>
        <tr>
          <th>Truck ID</th>
          <th>Truck Name</th>
          <th>Truck Capacity</th>
          <th>Driver</th>
          <th>Truck Status</th>
          <th>Truck Warehouse</th>
          <th>Remove</th>
        </tr>
        {userData.map((user: any) => {
          return (
            <tr key={user._id}>
              <td>{user.truckId}</td>
              <td>{user.truckName}</td>
              <td>{user.truckCapacity}</td>
              <td>{user.driverName}</td>
              <td>{user.status}</td>
              <td>{user.assignedWarehouse.name}</td>
              <button
            onClick={(e) => handleDeleteTruck(e, user.truckId)}
          >
            Remove Truck
          </button>
            </tr>
          )
        })}
      </table>
    </main>
  );
};

export default Fleet;
