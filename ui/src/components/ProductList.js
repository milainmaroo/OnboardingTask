import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProducts,
  NewProduct,
  EditProduct,
  DeleteProduct,
} from "../services/products";
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
  const products = useSelector((state) => state.productsReducer.products);
  // console.log({ products });

  const [modalTitle, setModalTitle] = useState("");
  const [ProductId, setProductId] = useState(0);
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const [sortedData, setSortedData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");
  const [productIdToDelete, setProductIdToDelete] = useState("");

  useEffect(() => {
    GetProducts(dispatch);
  }, [refresh]);

  useEffect(() => {
    if (products.length > 0) {
      setSortedData(products);
    }
  }, [products]);

  const toggleModal = () => {
    setOpen(!open);
    // console.log(open);
  };

  const addClick = () => {
    toggleModal();

    setModalTitle("Create Product");
    setProductId(0);
    setProductName("");
    setProductPrice("");
  };

  const editClick = (pro) => {
    toggleModal();

    setModalTitle("Edit Product");
    setProductId(pro.productId);
    setProductName(pro.productName);
    setProductPrice(pro.productPrice);
  };

  const deleteClick = (product) => {
    const { productId, productName, productPrice } = product;
    setModalTitle("Delete Product");
    setProductIdToDelete(productId);
    setProductToDelete(productName);
    setProductId(productId);
    setProductName(productName);
    setProductPrice(productPrice);
    toggleDeleteModal();
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  const deleteData = () => {
    console.log({
      ProductId,
      ProductName,
      ProductPrice,
    });
    DeleteProduct(dispatch, {
      ProductId,
      ProductName,
      ProductPrice,
    });
    toggleDeleteModal();
    setRefresh((refresh) => !refresh);
  };

  const createClick = (e) => {
    NewProduct(dispatch, {
      ProductName: ProductName,
      ProductPrice: ProductPrice,
    });

    //console.log(ProductName);
    //console.log(ProductPrice);

    setRefresh((refresh) => !refresh);
    toggleModal();
  };

  const updateClick = () => {
    EditProduct(dispatch, {
      ProductId: ProductId,
      ProductName: ProductName,
      ProductPrice: ProductPrice,
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
  const paginateProducts = (event) => {
    const pageNumber = setPNumbers(event.target.value);
    console.log({ pageNumber });

    setSortedData(
      sortedData.filter((product, index) => {
        if (index >= pageNumber || sortedData?.length < 10) {
          return true;
        }
        return false;
      })
    );
  };

  const ProductPageNumbers = [
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
        New Product
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name{" "}
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("productName", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("productName", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Price{" "}
              <Icon
                name="angle down"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("productPrice", "asc")}
              />
              <Icon
                name="angle up"
                style={{ cursor: "pointer" }}
                onClick={() => sortTable("productPrice", "desc")}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedData.map((pro) => {
            //console.log({ custt: cust });
            return (
              <Table.Row key={pro.customerId}>
                <Table.Cell>{pro.productName}</Table.Cell>
                <Table.Cell>$ {pro.productPrice}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="yellow"
                    onClick={() => editClick(pro)}
                  >
                    <Icon name="edit"></Icon>Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="ui button"
                    color="red"
                    onClick={() => deleteClick(pro)}
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
                  options={ProductPageNumbers}
                  onChange={paginateProducts}
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
                name="productname"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>PRICE</label>
              <input
                type="text"
                name="productprice"
                value={ProductPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={toggleModal}>
            <Icon name="remove" /> Cancel
          </Button>
          {ProductId === 0 ? (
            <Button color="green" onClick={createClick}>
              <Icon name="checkmark" /> Create
            </Button>
          ) : null}
          {ProductId !== 0 ? (
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
            Are you sure you want to delete product {productToDelete}?
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
