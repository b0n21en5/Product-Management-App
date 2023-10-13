import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthSlice";

const NavBar = () => {
  const path = useLocation().pathname;

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className={styles.nav}>
      <div className={styles.nav_left}>
        <Link to="/">Home</Link>
      </div>

      <div className={styles.nav_right}>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <div className={styles.user}>{user}</div>
            <div className={styles.user} onClick={() => dispatch(logout())}>
              Logout
            </div>
          </>
        )}
        {path !== "/add-new-product" ? (
          <Link to="/add-new-product">Add Product</Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavBar;
