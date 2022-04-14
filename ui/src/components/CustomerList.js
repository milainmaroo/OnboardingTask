import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCustomers,
  NewCustomer,
  EditCustomer,
  DeleteCustomer,
} from "../services/customers";
import {
  Button,
  Table,
  Icon,
  Modal,
  Header,
  Menu,
  Select,
} from "semantic-ui-react";
import { Action } from "history";

export default () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customersReducer.customers);
  // console.log({ customers });

  const [modalTitle, setModalTitle] = useState("");
  const [CustomerId, setCustomerId] = useState(0);
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerAddress, setCustomerAddress] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const [sortedCustomers, setSortedCustomers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState("");
  const [customerIdToDelete, setCustomerIdToDelete] = useState("");

  useEffect(() => {
    GetCustomers(dispatch);
  }, [refresh]);

  useEffect(() => {
    if (customers.length > 0) {
      setSortedCustomers(customers);
    }
  }, [customers]);

  const toggleModal = () => {
    setOpen(!open);
    // console.log(open);
  };

  const addClick = () => {
    toggleModal();

    setModalTitle("Create Customer");
    setCustomerId(0);
    setCustomerName("");
    setCustomerAddress("");
  };

  const editClick = (cust) => {
    toggleModal();

    setModalTitle("Edit Customer");
    setCustomerId(cust.customerId);
    setCustomerName(cust.customerName);
    setCustomerAddress(cust.customerAddress);
  };

  const deleteClick = (customer) => {
    const { customerId, customerName, customerAddress } = customer;
    setModalTitle("Delete Customer");
    setCustomerIdToDelete(customerId);
    setCustomerToDelete(customerName);
    setCustomerId(customerId);
    setCustomerName(customerName);
    setCustomerAddress(customerAddress);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  const deleteData = () => {
    console.log({
      CustomerId,
      CustomerName,
      CustomerAddress,
    });
    DeleteCustomer(dispatch, {
      CustomerId,
      CustomerName,
      CustomerAddress,
    });
    toggleDeleteModal();
    setRefresh((refresh) => !refresh);
  };

  const createClick = (e) => {
    NewCustomer(dispatch, {
      CustomerName: CustomerName,
      CustomerAddress: CustomerAddress,
    });

    console.log(CustomerName);
    console.log(CustomerAddress);

    setRefresh((refresh) => !refresh);
    toggleModal();
  };

  const updateClick = () => {
    EditCustomer(dispatch, {
      CustomerId: CustomerId,
      CustomerName: CustomerName,
      CustomerAddress: CustomerAddress,
    });
    setRefresh((refresh) => !refresh);
    toggleModal();
  };

  const sortTable = (property, order) => {
    let sorted;
    if (order === "asc") {
      sorted = [...sortedCustomers].sort((first, second) => {
        if (first[property] < second[property]) {
          return -1;
        } else if (first[property] > second[property]) {
          return 1;
        }
        return 0;
      });
    } else if (order === "desc") {
      sorted = [...sortedCustomers].sort((first, second) => {
        if (first[property] < second[property]) {
          return 1;
        } else if (first[property] > second[property]) {
          return -1;
        }
        return 0;
      });
    } else {
      sorted = sortedCustomers;
    }
    setSortedCustomers(sorted);
  };

  const [pNumbers, setPNumbers] = useState(0);
  const paginateCustomers = (event) => {
    const pageNumber = setPNumbers(event.target.value);
    console.log({ pageNumber });

    setSortedCustomers(
      sortedCustomers.filter((customer, index) => {
        if (index >= pageNumber || sortedCustomers?.length < 10) {
          return true;
        }
        return false;
      })
    );
  };

  const CustomerPageNumbers = [
    {
      key: 10,
      value: 10,
      text: 10,
    },
    {
      key: 20,
      value: 20,
      text: 20,
    },
    {
      key: 30,
      value: 30,
      text: 30,
    },
  ];

  //console.log({ sortedData: sortedData });
  return (
    <div>
      <Button
        className="ui primary button"
        floated="left"
        onClick={addClick}
        style={{ margin: "10px 5px" }}
      >
        New Customer
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name{" "}
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("customerName", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("customerName", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Address{" "}
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("customerAddress", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("customerAddress", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedCustomers.map((cust) => {
            //console.log({ custt: cust });
            return (
              <Table.Row key={cust.customerId}>
                <Table.Cell>{cust.customerName}</Table.Cell>
                <Table.Cell>{cust.customerAddress}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="yellow"
                    onClick={() => editClick(cust)}
                  >
                    <Icon name="edit"></Icon>Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="red"
                    onClick={() => deleteClick(cust)}
                  >
                    <Icon name="trash"></Icon>Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Menu floated="left" compact>
                <Select
                  placeholder="Page Number"
                  options={CustomerPageNumbers}
                  onChange={paginateCustomers}
                />
              </Menu>
              <Menu floated="right" pagination>
                <Menu.Item as="a">1</Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
          <p className="copyright">&copy; 2022 - Norine Oo</p>
        </Table.Footer>
      </Table>

      {/* Pop Up Modal */}
      <Modal open={open} onClose={toggleModal}>
        <Header>{modalTitle}</Header>
        <Modal.Content>
          <form className="ui form">
            <div className="field">
              <label>NAME</label>
              <input
                type="text"
                name="customername"
                value={CustomerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>ADDRESS</label>
              <input
                type="text"
                name="customeraddress"
                value={CustomerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={toggleModal}>
            <Icon name="remove" /> Cancel
          </Button>
          {CustomerId === 0 ? (
            <Button color="green" onClick={createClick}>
              <Icon name="checkmark" /> Create
            </Button>
          ) : null}
          {CustomerId !== 0 ? (
            <Button color="green" onClick={updateClick}>
              <Icon name="checkmark" /> Update
            </Button>
          ) : null}
        </Modal.Actions>
      </Modal>

      {/* Pop Up Modal - Delete */}
      {showDeleteModal ? (
        <Modal open={showDeleteModal} onClose={toggleDeleteModal}>
          <Header>{modalTitle}</Header>
          <Modal.Content>
            Are you sure you want to delete customer {customerToDelete}?
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={toggleDeleteModal}>
              <Icon name="remove" /> Cancel
            </Button>
            <Button color="red" onClick={deleteData}>
              <Icon name="delete" /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      ) : null}
    </div>
  );
};
