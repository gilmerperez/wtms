import { useQuery, useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { QUERY_ALL_WAREHOUSES } from "../utils/queries";
import { 
  ADD_WAREHOUSE, 
  ADD_ITEM, 
  // DELETE_WAREHOUSE, 
  DELETE_ITEM, 
  UPDATE_ITEM, 
  // UPDATE_WAREHOUSE
 } from "../utils/mutations";



const Warehouse = () => {
  const { loading, data } = useQuery(QUERY_ALL_WAREHOUSES);
  const warehouseData = data?.getWarehouses || [];
  console.log(warehouseData);
  const itemData = data?.getWarehouses.items || [];
  console.log(itemData);

  const [addWarehouse] = useMutation(ADD_WAREHOUSE);
  const [addItem] = useMutation(ADD_ITEM);
  const [deleteItem] = useMutation(DELETE_ITEM);
  const [updateItem] = useMutation(UPDATE_ITEM);

  const handleAddWarehouse = async (e: any) => {
    e.preventDefault();
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await addWarehouse({
        variables: {
          name: "New Warehouse",
          location: "New Location",
          capacity: 1000,
          items: [
            {
              itemName: "New Item",
              quantity: 10,
              arrivalDate: new Date().toISOString(),
            },
          ]
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  const handleAddItem = async (e: any, warehouseId: string) => {
    e.preventDefault();
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await addItem({
        variables: {
          warehouseId,
          itemName: "New Item",
          quantity: 10,
          arrivalDate: new Date().toISOString(),
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  const handleDeleteItem = async (e: any, warehouseId: string, itemId: string) => {
    e.preventDefault();
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await deleteItem({
        variables: {
          warehouseId,
          itemId,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  const handleUpdateItem = async (e: any, warehouseId: string, itemId: string) => {
    e.preventDefault();
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await updateItem({
        variables: {
          warehouseId,
          itemId,
          input: {
            itemName: "Updated Item",
            quantity: 20,
            arrivalDate: new Date().toISOString(),
          },
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main>
      <h1>Warehouse Management</h1>
      <button onClick={handleAddWarehouse}>Add Warehouse</button>
      <table className="warehouse-table">
        <thead>
          <tr>
            <th>Warehouse ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Items</th>
            {/* <th>Add Items</th> */}
          </tr>
        </thead>
        <tbody>
          {warehouseData.map((warehouse: any) => (
            <tr key={warehouse._id}>
              <td>{warehouse._id}</td>
              <td>{warehouse.name}</td>
              <td>{warehouse.location}</td>
              <td>{warehouse.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Items in Warehouses</h2>
      <button onClick={(e) => handleAddItem(e, warehouseData[0]?._id)}>Add Item to Warehouse</button>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Arrival Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouseData.map((warehouse: any) => (
            warehouse.items.map((item: any) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.arrivalDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={(e) => handleUpdateItem(e, warehouse._id, item._id)}>Update Item</button>
                  <button onClick={(e) => handleDeleteItem(e, warehouse._id, item._id)}>Delete Item</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </main>
  );

}

export default Warehouse;