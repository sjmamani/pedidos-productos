import React from "react";

const Tabla = props => {
  const header = props.headers.map((header, index) => {
    return <th key={index}>{header}</th>;
  });
  return (
    <table className="table">
      <thead style={{ backgroundColor: "#001932", color: "#fff" }}>
        <tr>{header}</tr>
      </thead>
      {props.contenido}
    </table>
  );
};

export default Tabla;
