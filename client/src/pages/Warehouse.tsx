import "../styles/UserMgt.css";
import auth from "../utils/auth";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_WAREHOUSES } from "../utils/queries";
import {
  ADD_WAREHOUSE,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
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
  const [newWarehouse, setNewWarehouse] = useState<{
    name: string;
    location: string;
    capacity: number;
    items: { itemName: string; quantity: number; arrivalDate: string }[];
  }>({
    name: "",
    location: "",
    capacity: 0,
    items: [],
  });
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: 0,
    arrivalDate: new Date().toISOString(),
  });

  const handleAddWarehouse = async (e: any) => {
    e.preventDefault();
    if (
      !newWarehouse.name ||
      !newWarehouse.location ||
      !newWarehouse.capacity
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await addWarehouse({
        variables: {
          name: newWarehouse.name,
          location: newWarehouse.location,
          capacity: newWarehouse.capacity,
          items: [],
        },
      });

      setNewWarehouse({
        name: "Miami Warehouse 1",
        location: "Miami, USA",
        capacity: 1100,
        items: [
          {
            itemName: "New Item",
            quantity: 10,
            arrivalDate: new Date().toISOString(),
          },
        ],
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
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
  };
  const handleDeleteItem = async (
    e: any,
    warehouseId: string,
    itemId: string
  ) => {
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
  };
  const handleUpdateItem = async (
    e: any,
    warehouseId: string,
    itemId: string
  ) => {
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
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="container-fluid px-3" style={{ paddingTop: "200px" }}>
      <h1 className="heading text-center my-4">Warehouse Management</h1>

      {/* Add New Warehouse Section */}
      <div className="section">
        <h2 className="mb-3">Add New Warehouse</h2>
        <form
          onSubmit={handleAddWarehouse}
          className="row g-3 align-items-center"
        >
          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Warehouse Name"
              value={newWarehouse.name}
              onChange={(e) =>
                setNewWarehouse({ ...newWarehouse, name: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Location"
              value={newWarehouse.location}
              onChange={(e) =>
                setNewWarehouse({ ...newWarehouse, location: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="number"
              placeholder="Capacity"
              value={newWarehouse.capacity}
              onChange={(e) =>
                setNewWarehouse({
                  ...newWarehouse,
                  capacity: parseInt(e.target.value),
                })
              }
              className="form-control"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Warehouse
            </button>
          </div>
        </form>
      </div>

      {/* List of Warehouses Section */}
      <div className="section mt-5">
        <h2 className="mb-3">Warehouses</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Warehouse ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {warehouseData.map((warehouse: any) => (
                <tr key={warehouse._id}>
                  <td>{warehouse._id}</td>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.capacity}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={(e) => handleAddItem(e, warehouse._id)}
                    >
                      Add Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Item Section */}
      <div className="section mt-5">
        <h2 className="mb-3">Add New Item</h2>
        <form
          onSubmit={(e) => handleAddItem(e, warehouseData[0]?._id)}
          className="row g-3 align-items-center"
        >
          <div className="col-12 col-md-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.itemName}
              onChange={(e) =>
                setNewItem({ ...newItem, itemName: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
              }
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="date"
              value={newItem.arrivalDate.split("T")[0]}
              onChange={(e) =>
                setNewItem({ ...newItem, arrivalDate: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Item
            </button>
          </div>
        </form>
      </div>

      {/* List of Items Section */}
      <div className="section mt-5">
        <h2 className="mb-3">Items in Warehouses</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Arrival Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouseData.map((warehouse: any) =>
                warehouse.items.map((item: any) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{new Date(item.arrivalDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mx-1"
                        onClick={(e) =>
                          handleUpdateItem(e, warehouse._id, item._id)
                        }
                      >
                        Update Item
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={(e) =>
                          handleDeleteItem(e, warehouse._id, item._id)
                        }
                      >
                        Delete Item
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Warehouse;
