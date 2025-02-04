import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./AddCampPage.css"; // Add your custom styles

const AddCamp = () => {
  const [campName, setCampName] = useState("");
  const [campDate, setCampDate] = useState("");
  const [campLocation, setCampLocation] = useState("");

  const db = getFirestore();

  const handleAddCamp = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "upcoming_camps"), {
        campName,
        campDate,
        campLocation,
      });
      toast.success("Camp added successfully!");
      setCampName("");
      setCampDate("");
      setCampLocation("");
    } catch (e) {
      toast.error("Error adding camp: " + e.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add New Camp</h2>

      <Form onSubmit={handleAddCamp}>
        <Row>
          <Col xs={12} md={6} className="mb-3">
            <Form.Group controlId="formCampName">
              <Form.Label>Camp Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter camp name"
                value={campName}
                onChange={(e) => setCampName(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Group controlId="formCampDate">
              <Form.Label>Camp Date</Form.Label>
              <Form.Control
                type="date"
                value={campDate}
                onChange={(e) => setCampDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <Form.Group controlId="formCampLocation">
              <Form.Label>Camp Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter camp location"
                value={campLocation}
                onChange={(e) => setCampLocation(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col xs={12} className="text-center">
            <Button variant="primary" type="submit" className="mt-3 px-4 py-2">
              Add Camp
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCamp;
