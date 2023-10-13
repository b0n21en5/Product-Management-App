import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import styles from "./AddProduct.module.css";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    try {
      let { name, price, rating, featured, company } = e;
      const currDate = new Date();

      featured = featured == "true" ? true : false;

      const res = await axios.post("/api/products/add-product", {
        productId: currDate,
        name: name,
        price: price,
        rating: rating,
        featured: featured,
        createdAt: currDate,
        company: company,
      });

      console.log(res.data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <Formik
          initialValues={{
            name: "",
            price: "",
            rating: "",
            company: "",
            featured: false,
          }}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <label>Name:</label>
            <Field
              name="name"
              type="text"
              required={true}
              placeholder="enter product name here"
            />
            <label>Price:</label>
            <Field name="price" type="number" required={true} />
            <label>Rating:</label>
            <Field name="rating" type="number" required={true} />
            <label>Company:</label>
            <Field
              name="company"
              type="text"
              required={true}
              placeholder="enter company name here"
            />
            <label>
              Featured:
              <label>
                <Field name="featured" type="radio" value="true" />
                Yes
              </label>
              <label>
                <Field name="featured" type="radio" value="false" />
                No
              </label>
            </label>
            <button className={styles.submit} type="submit">
              Submit
            </button>
          </Form>
        </Formik>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AddProduct;
