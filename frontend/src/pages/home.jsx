import React, { useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoopingComp from "../components/LoopingComp";
import { listProducts } from "../redux/actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products: { products },
  } = productList;  

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Our Featured Products</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : products?.length === 0 ? (
        <Alert variant="info" className="text-center">
          No products available at the moment.
        </Alert>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={6} lg={4} xl={3} className="mb-4">
              <LoopingComp product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
