import { Formik, Form, Field } from "formik";
import styles from "./Auth.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../store/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    const { email, password } = e;
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.auth_cnt}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        <Form className={styles.form}>
          <label>Email:</label>
          <Field
            name="email"
            type="text"
            required={true}
            placeholder="Enter Your Registered Email"
          />
          <label>Password:</label>
          <Field
            name="password"
            type="text"
            required={true}
            placeholder="Enter Your Password"
          />
          <button className={styles.submit} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
