import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/login`);
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
      <div style={{ height: "90vh",marginLeft:"100px" }}>
        <h1>Login to Perform CRUD Operations {count}</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
