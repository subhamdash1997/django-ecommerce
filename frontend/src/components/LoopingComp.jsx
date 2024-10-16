import React from "react";
import { Table, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoopingComp = ({ product }) => {
  const defaultImage =
    "https://via.placeholder.com/300x200/000000/FFFFFF?text=No+Image"; // Black placeholder image
  return (
    <Link
      to={`/product/${product._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        className="shadow-lg h-100"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <div
          className="image-wrapper"
          style={{ width: "100%", height: "200px", overflow: "hidden" }}
        >
          <Image
            src={product?.image || defaultImage}
            alt={product.product_name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            fluid
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-dark">{product.product_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {product.category}
          </Card.Subtitle>
          <Table borderless size="sm" className="mb-3">
            <tbody>
              <tr>
                <td>
                  <strong>Brand:</strong>
                </td>
                <td>{product.product_brand}</td>
              </tr>
              <tr>
                <td>
                  <strong>Category:</strong>
                </td>
                <td>{product.product_category}</td>
              </tr>
              <tr>
                <td>
                  <strong>Rating:</strong>
                </td>
                <td>{product.rating} / 5</td>
              </tr>
              <tr>
                <td>
                  <strong>Price:</strong>
                </td>
                <td>${product.price}</td>
              </tr>
              <tr>
                <td>
                  <strong>Created At:</strong>
                </td>
                <td>{new Date(product.created_at).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-primary mt-auto align-self-start">
            View Product
          </button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default LoopingComp;
