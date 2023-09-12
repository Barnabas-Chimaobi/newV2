import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function spinner() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const imageStyle = {
    width: "50px", // Adjust the width as needed
    height: "50px", // Adjust the height as needed
  };

  return (
    <>
      <div style={containerStyle}>
        <ProgressSpinner />
      </div>
    </>
  );
}
