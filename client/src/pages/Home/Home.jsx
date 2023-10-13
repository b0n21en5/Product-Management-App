import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [filters, setFilters] = useState({ price: 99999, rating: 1 });

  const {token,user} = useSelector((state) => state.auth);

  const fetchAllProducts = async (filters) => {
    try {
      const result = await axios.get(
        `/api/products/get-all-products?price=${filters.price}&rating=${filters.rating}`,
        {
          headers: { Authorization: token },
        }
      );
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const { data } = await axios.delete(
        `/api/products/delete-product/${productId}`
      );
      console.log(data);
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts(filters);
  }, [user]);

  return (
    <div className={styles.home_cnt}>
      <div className={styles.filters_cnt}>
        <label className={styles.fil_title}>Filters Products By</label>
        <label htmlFor="">Price Less than</label>
        <input
          className={styles.mb_20}
          type="number"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              price: parseInt(e.target.value) || 99999,
            }))
          }
        />
        <label htmlFor="">Rating greater than</label>
        <input
          className={styles.mb_20}
          type="number"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              rating: parseInt(e.target.value) || 1,
            }))
          }
        />
        <button onClick={() => fetchAllProducts(filters)}>Apply Filters</button>
      </div>
      {user?
      <main>
        {products?.map((pr) => (
          <div className={styles.product_list} key={pr._id}>
            <div>Name: {pr.name}</div>
            <div>Price: {pr.price}</div>
            <div>Rating: {pr.rating}</div>
            <div>Company: {pr.company}</div>
            <div>Featured: {pr.featured ? "Yes" : "No"}</div>
            <div className={styles.btn_cnt}>
              <button onClick={() => setProductToUpdate(pr.productId)}>
                Update
              </button>
              <button onClick={() => handleDeleteProduct(pr.productId)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {productToUpdate && (
          <UpdateProduct
            setProductToUpdate={setProductToUpdate}
            productId={productToUpdate}
          />
        )}
      </main>:<Spinner/>}
    </div>
  );
};

export default Home;
