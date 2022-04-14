import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSales, NewSale, EditSale, DeleteSale } from "../services/sales";
import {
  Button,
  Table,
  Icon,
  Modal,
  Header,
  Menu,
  Select,
  Dropdown,
} from "semantic-ui-react";
import { Action } from "history";

export default () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.salesReducer.sales);
  const customers = useSelector((state) => state.customersReducer.customers);
  const products = useSelector((state) => state.productsReducer.products);
  const stores = useSelector((state) => state.storesReducer.stores);

  const [modalTitle, setModalTitle] = useState("");
  const [SalesId, setSalesId] = useState(0);
  const [Product, setProduct] = useState("");
  const [Customer, setCustomer] = useState("");
  const [Store, setStore] = useState("");
  const [DateSold, setDateSold] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const [sortedData, setSortedData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //const [saleToDelete, setSaleToDelete] = useState("");
  const [salesIdToDelete, setSalesIdToDelete] = useState("");

  useEffect(() => {
    GetSales(dispatch);
  }, [refresh]);

  useEffect(() => {
    if (sales.length > 0) {
      setSortedData(sales);
    }
  }, [sales]);

  const toggleModal = () => {
    setOpen(!open);
    // console.log(open);
  };

  const addClick = () => {
    toggleModal();

    setModalTitle("Create Sale");
    setSalesId(0);
    setProduct("");
    setCustomer("");
    setStore("");
    setDateSold("");
  };

  const editClick = (sa) => {
    toggleModal();

    setModalTitle("Edit Sale");
    setSalesId(sa.salesId);
    setProduct(sa.product);
    setCustomer(sa.customer);
    setStore(sa.store);
    setDateSold(sa.dateSold);
  };

  const deleteClick = (sale) => {
    const { salesId, product, customer, store, dateSold } = sale;
    setModalTitle("Delete Sale");
    setSalesIdToDelete(salesId);
    //setSaleToDelete(customer);
    setSalesId(salesId);
    setProduct(product);
    setCustomer(customer);
    setStore(store);
    setDateSold(dateSold);

    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  const deleteData = () => {
    console.log({
      SalesId,
      Product,
      Customer,
      Store,
      DateSold,
    });
    DeleteSale(dispatch, {
      SalesId,
      Product,
      Customer,
      Store,
      DateSold,
    });
    toggleDeleteModal();
    setRefresh((refresh) => !refresh);
  };

  const createClick = (e) => {
    NewSale(dispatch, {
      Product: Product,
      Customer: Customer,
      Store: Store,
      DateSold: DateSold,
    });

    setRefresh((refresh) => !refresh);
    toggleModal();
  };

  const updateClick = () => {
    EditSale(dispatch, {
      SalesId: SalesId,
      Product: Product,
      Customer: Customer,
      Store: Store,
      DateSold: DateSold,
    });
    setRefresh((refresh) => !refresh);

    toggleModal();
  };

  const sortTable = (property, order) => {
    let sorted;
    if (order === "asc") {
      sorted = [...sortedData].sort((first, second) => {
        if (first[property] < second[property]) {
          return -1;
        } else if (first[property] > second[property]) {
          return 1;
        }
        return 0;
      });
    } else if (order === "desc") {
      sorted = [...sortedData].sort((first, second) => {
        if (first[property] < second[property]) {
          return 1;
        } else if (first[property] > second[property]) {
          return -1;
        }
        return 0;
      });
    } else {
      sorted = sortedData;
    }
    setSortedData(sorted);
  };

  const [pNumbers, setPNumbers] = useState(0);
  const paginateSales = (event) => {
    const pageNumber = setPNumbers(event.target.value);
    console.log({ pageNumber });

    setSortedData(
      sortedData.filter((sale, index) => {
        if (index >= pageNumber || sortedData?.length < 10) {
          return true;
        }
        return false;
      })
    );
  };

  const SalePageNumbers = [
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
        New Sale
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Customer
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("customer", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("customer", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Product
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("product", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("product", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Store
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("store", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("store", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              DateSold
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("dateSold", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("dateSold", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedData.map((sa) => {
            return (
              <Table.Row key={sa.salesId}>
                <Table.Cell>{sa.customer}</Table.Cell>
                <Table.Cell>{sa.product}</Table.Cell>
                <Table.Cell>{sa.store}</Table.Cell>
                <Table.Cell>{sa.dateSold}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="yellow"
                    onClick={() => editClick(sa)}
                  >
                    <Icon name="edit"></Icon>Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="red"
                    onClick={() => deleteClick(sa)}
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
            <Table.HeaderCell colSpan="6">
              <Menu floated="left" compact>
                <Select
                  placeholder="Page Number"
                  options={SalePageNumbers}
                  onChange={paginateSales}
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
              <label>DATE SOLD</label>
              <input
                type="date"
                name="datesold"
                value={DateSold}
                onChange={(e) => setDateSold(e.target.value)}
              />
            </div>
            <div className="field">
              <label>CUSTOMER</label>
              <Dropdown
                placeholder="Customer"
                onChange={(e, data) => setCustomer(data.value)}
                value={Customer}
                search
                selection
                options={customers.map((cust) => {
                  return {
                    key: cust.customerId,
                    text: cust.customerName,
                    value: cust.customerName,
                  };
                })}
              />
            </div>
            <div className="field">
              <label>PRODUCT</label>
              <Dropdown
                placeholder="Product"
                onChange={(e, data) => setProduct(data.value)}
                value={Product}
                search
                selection
                options={products.map((pro) => {
                  return {
                    key: pro.productId,
                    text: pro.productName,
                    value: pro.productName,
                  };
                })}
              />
            </div>
            <div className="field">
              <label>STORE</label>
              <Dropdown
                placeholder="Store"
                onChange={(e, data) => setStore(data.value)}
                value={Store}
                search
                selection
                options={stores.map((st) => {
                  return {
                    key: st.storeId,
                    text: st.storeName,
                    value: st.storeName,
                  };
                })}
              />
            </div>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={toggleModal}>
            <Icon name="remove" /> Cancel
          </Button>
          {SalesId === 0 ? (
            <Button color="green" onClick={createClick}>
              <Icon name="checkmark" /> Create
            </Button>
          ) : null}
          {SalesId !== 0 ? (
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
          <Modal.Content>Are you sure?</Modal.Content>
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
