import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import LoopingComp from "../components/LoopingComp";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("api/products/");
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Our Featured Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={6} lg={4} xl={3} className="mb-4">
            <LoopingComp product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
