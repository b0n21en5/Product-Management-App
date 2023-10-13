import { Formik, Form, Field } from "formik";
import axios from "axios";
import styles from "../AddProduct/AddProduct";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import "./updateproduct.css";

const UpdateProduct = ({ productId, setProductToUpdate }) => {
  const [product, setProduct] = useState({});

  const { token } = useSelector((state) => state.auth);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/products/get-product/${productId}`,
        {
          headers: { Authorization: token },
        }
      );
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdateProduct = async (e) => {
    try {
      let { name, price, rating, featured, company } = e;

      featured = featured == "true" ? true : false;

      const { data } = await axios.put(
        `/api/products/update-product/${productId}`,
        {
          name: name,
          price: price,
          rating: rating,
          featured: featured,
          company: company,
        }
      );

      console.log(data);

      setProductToUpdate(null);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="update-modal-overlay"
      onClick={() => setProductToUpdate(null)}
    >
      <Formik
        initialValues={{
          name: product.name || "",
          price: "",
          rating: "",
          company: "",
          featured: false,
        }}
        onSubmit={handleUpdateProduct}
      >
        {({ values, handleChange }) => (
          <Form
            className={`${styles.form} update-modal`}
            onClick={(e) => e.stopPropagation()}
          >
            <label>Name:</label>
            <Field
              name="name"
              type="text"
              required={true}
              placeholder="enter product name here"
              value={product.name}
              onChange={handleChange}
            />
            <label>Price:</label>
            <Field
              name="price"
              type="number"
              required={true}
              value={product.price}
            />
            <label>Rating:</label>
            <Field
              name="rating"
              type="number"
              required={true}
              value={product.rating}
            />
            <label>Company:</label>
            <Field
              name="company"
              type="text"
              required={true}
              placeholder="enter company name here"
              value={product.company}
            />
            <label>
              Featured:
              <label>
                <Field
                  name="featured"
                  type="radio"
                  value="true"
                  checked={product.featured === true}
                />
                Yes
              </label>
              <label>
                <Field
                  name="featured"
                  type="radio"
                  value="false"
                  checked={product.featured === false}
                />
                No
              </label>
            </label>
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>,
    document.getElementById("modal")
  );
};

export default UpdateProduct;
