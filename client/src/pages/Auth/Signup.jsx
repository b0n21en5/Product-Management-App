import { Formik, Form, Field } from "formik";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    const { username, email, password } = e;

    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.auth_cnt}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSignup}
      >
        <Form className={styles.form}>
          <label>Username:</label>
          <Field
            name="username"
            type="text"
            required={true}
            placeholder="Enter Username here"
          />
          <label>Email:</label>
          <Field
            name="email"
            type="text"
            required={true}
            placeholder="Enter Email here"
          />
          <label>Password:</label>
          <Field
            name="password"
            type="text"
            required={true}
            placeholder="Enter password here"
          />
          <button className={styles.submit} type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
