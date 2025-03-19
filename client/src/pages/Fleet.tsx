import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_TRUCKS } from "../utils/queries";
import { REMOVE_TRUCK } from "../utils/mutations";
import auth from "../utils/auth";
const Fleet = () => {

  const { loading, data } = useQuery(QUERY_ALL_TRUCKS)
  //VERIFY IF THE .TRUCKS PART IS TOTALLY NECESSARY
  const userData = data?.trucks

  const [removeTruck] = useMutation(REMOVE_TRUCK)

  const handleDeleteTruck = async (truckId: string) => {
    const token = auth.loggedIn() ? auth.getToken() : null; 
    if (!token){ 
      return false; 
    }
    try { 
      const response = await removeTruck({ 
        variables: { 
          truckId
         } 
        });
        
        if(!response.data || !response.data.removeTruck) {
          throw new Error('Something went wrong, please try again.')
        }
        removeTruck(userData.truckId)
      }
      catch(err) {
        console.error(err)        
      }
  };

  if (loading) {
    return <h2>Loading...</h2>
  }

  //I NEED TO ACCESS THE SEED DATA/DATABASE TO BE ABLE TO EXTRACT THAT DATA AND APPLY IT TO MY TABLE
  //
  const tableRow = userData.map((userData: any) => {
    return (
      <tr key={userData._id}>
        <td>{userData.truckId}</td>
        <td>{userData.truckName}</td>
        <td>{userData.truckCapacity}</td>
        <td>{userData.driverName}</td>
        <td>{userData.status}</td>
        <td>{userData.assignedWarehouse}</td>
      </tr>
    )
  })
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
          <button
            onClick={() => handleDeleteTruck(userData.truckId)}
          >
            Remove Truck
            </button>
        </tr>
        {tableRow}
      </table>
    </main>
  );
};

export default Fleet;
