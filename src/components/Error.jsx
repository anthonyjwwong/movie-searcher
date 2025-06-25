// components/Error.jsx
import React from "react";

const Error = ({ message = "Something went wrong" }) => {
  return (
    <div className="error" role="alert" aria-live="assertive">
      <p style={{ color: "#dc3545", marginBottom: "1rem" }}>{message}</p>
    </div>
  );
};

export default Error;
