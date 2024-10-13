import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const defaultImage = "https://via.placeholder.com/600x400/000000/FFFFFF?text=No+Image";

  useEffect(() => {
    async function fetchProduct() {
      const { data: { product } } = await axios.get(`/api/products/${id}/`);
      setProduct(product);
    }
    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} style={{ color: "#FFD700" }} />);
      } else if (i - rating === 0.5) {
        stars.push(<FaStarHalfAlt key={i} style={{ color: "#FFD700" }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: "#FFD700" }} />);
      }
    }
    return stars;
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="py-5">
      <Button
        variant="link"
        onClick={() => window.history.back()}
        className="position-absolute top-0 start-1 text-dark"
        style={{ fontSize: "1.2rem", color: "#007bff", marginTop: "65px" }}
      >
        <BsArrowLeft /> Back
      </Button>
      <Row className="justify-content-center">
        <Col md={5} className="text-center mb-4">
          <Image
            src={product.image || defaultImage}
            alt={product.product_name}
            fluid
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Col>
        <Col md={7}>
          <h4 className="text-primary">{product.product_name}</h4>
          <h6 className="text-muted mb-3">{product.product_category}</h6>
          <Table borderless size="sm">
            <tbody>
              <tr>
                <td><strong>Brand:</strong></td>
                <td>{product.product_brand}</td>
              </tr>
              <tr>
                <td><strong>Category:</strong></td>
                <td>{product.product_category}</td>
              </tr>
              <tr>
                <td><strong>Rating:</strong></td>
                <td>{renderStars(product.rating)}</td>
              </tr>
              <tr>
                <td><strong>Price:</strong></td>
                <td>$ {product.price}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td className={`fw-bold ${product.stock_count > 0 ? "text-success" : "text-danger"}`}>
                  {product.stock_count > 0 ? "Available" : "Not Available"}
                </td>
              </tr>
              <tr>
                <td><strong>Created At:</strong></td>
                <td>{new Date(product.created_at).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </Table>
          <p className="mt-3 mb-3">{product.description || "No description available."}</p>
          <Button variant="primary" className="mt-2">Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
