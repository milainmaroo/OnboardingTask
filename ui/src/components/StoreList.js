import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStores,
  NewStore,
  EditStore,
  DeleteStore,
} from "../services/stores";
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
  const stores = useSelector((state) => state.storesReducer.stores);
  // console.log({ stores });

  const [modalTitle, setModalTitle] = useState("");
  const [StoreId, setStoreId] = useState(0);
  const [StoreName, setStoreName] = useState("");
  const [StoreAddress, setStoreAddress] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const [sortedData, setSortedData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState("");
  const [storeIdToDelete, setStoreIdToDelete] = useState("");

  useEffect(() => {
    GetStores(dispatch);
  }, [refresh]);

  useEffect(() => {
    if (stores.length > 0) {
      setSortedData(stores);
    }
  }, [stores]);

  const toggleModal = () => {
    setOpen(!open);
    // console.log(open);
  };

  const addClick = () => {
    toggleModal();

    setModalTitle("Create Store");
    setStoreId(0);
    setStoreName("");
    setStoreAddress("");
  };

  const editClick = (st) => {
    toggleModal();

    setModalTitle("Edit Store");
    setStoreId(st.storeId);
    setStoreName(st.storeName);
    setStoreAddress(st.storeAddress);
  };

  const deleteClick = (store) => {
    const { storeId, storeName, storeAddress } = store;
    setModalTitle("Delete Store");
    setStoreIdToDelete(storeId);
    setStoreToDelete(storeName);
    setStoreId(storeId);
    setStoreName(storeName);
    setStoreAddress(storeAddress);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  const deleteData = () => {
    console.log({
      StoreId,
      StoreName,
      StoreAddress,
    });
    DeleteStore(dispatch, {
      StoreId,
      StoreName,
      StoreAddress,
    });
    toggleDeleteModal();
    setRefresh((refresh) => !refresh);
  };

  const createClick = (e) => {
    NewStore(dispatch, {
      StoreName: StoreName,
      StoreAddress: StoreAddress,
    });

    //console.log(StoreName);
    //console.log(StoreAddress);

    setRefresh((refresh) => !refresh);
    toggleModal();
  };

  const updateClick = () => {
    EditStore(dispatch, {
      StoreId: StoreId,
      StoreName: StoreName,
      StoreAddress: StoreAddress,
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
  const paginateStores = (event) => {
    const pageNumber = setPNumbers(event.target.value);
    console.log({ pageNumber });

    setSortedData(
      sortedData.filter((store, index) => {
        if (index >= pageNumber || sortedData?.length < 10) {
          return true;
        }
        return false;
      })
    );
  };

  const StorePageNumbers = [
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
        New Store
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name{" "}
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("storeName", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("storeName", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Address{" "}
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("storeAddress", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("storeAddress", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedData.map((st) => {
            return (
              <Table.Row key={st.storeId}>
                <Table.Cell>{st.storeName}</Table.Cell>
                <Table.Cell>{st.storeAddress}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="yellow"
                    onClick={() => editClick(st)}
                  >
                    <Icon name="edit"></Icon>Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="red"
                    onClick={() => deleteClick(st)}
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
                  options={StorePageNumbers}
                  onChange={paginateStores}
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
                name="storename"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>ADDRESS</label>
              <input
                type="text"
                name="storeaddress"
                value={StoreAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
              />
            </div>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={toggleModal}>
            <Icon name="remove" /> Cancel
          </Button>
          {StoreId === 0 ? (
            <Button color="green" onClick={createClick}>
              <Icon name="checkmark" /> Create
            </Button>
          ) : null}
          {StoreId !== 0 ? (
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
            Are you sure you want to delete store {storeToDelete}?
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
