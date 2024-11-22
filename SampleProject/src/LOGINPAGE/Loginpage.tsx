import { useState } from "react";
import { Col, Row, Container, Form, Carousel, Button } from "react-bootstrap";
import "../styles/LoginScreen.css";
import * as Yup from "yup";
//import LoadingOverlay from "@ronchalant/react-loading-overlay";

//import loginlogotop from "/images/Zen_Up.svg";
import loginlogotop from "/public/Algo_New_Website_Blue.svg";

import slide1 from "/public/zen_half_atTop.svg";
import slide2 from "/public/zenvector_slide.svg";
import slide3 from "/public/docuZen_slides.svg";
import slide4 from "/public/qualZen_slides.svg";
import slide5 from "/public/eduzen_slides.svg";
import slide6 from "/public/labzen_slides.svg";
import slide7 from "/public/vendorZen_slides.svg";
import slide8 from "/public/xezen_slides.svg";
import slide9 from "/public/notezen_slides.svg";
import slide10 from "/public/clinzen_slides.svg";
import slide11 from "/public/audit_slides.svg";
import { useFormik } from "formik";

function LoginScreen() {
  const [showZenLogo, setShowZenLogo] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Required*"),
      password: Yup.string().required("Required*"),
    }),

    onSubmit: (values: any) => {
      console.log(values);
    },
  });

  const slides = [
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
    slide9,
    slide10,
    slide11,
  ];

  const captions = [
    "AI/ML Integrated Life Sciences Products",
    "Smart creation, management and archival of documents",
    "Intelligent quality system that ensures compliance",
    "AI enabled, comprehensive learning ecosystem",
    "Automated, ML enabled laboratory workbench solution",
    "Smart easy vendor audits and evaluations for risk-free procurement",
    "A smart executable form builder for workflows",
    "Smart, interactive and intuitive lab notebook",
    "Automated end-to-end clinical workflow",
    "AI/ML enabled system for 24x7 audit readiness",
  ];

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
    if (selectedIndex === 0) {
      setShowZenLogo(true);
    } else {
      setShowZenLogo(false);
    }
  };
  function CustomCarousel() {
    return (
      <Carousel
        indicators={false}
        controls={false}
        activeIndex={activeIndex}
        onSelect={handleSelect}
        style={{ width: "100%" }}
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index} interval={1000}>
            <div
              //   className="carousel-image-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                //className="carousel_img"
              />
            </div>
            <div
              //className="carousel-caption"
              style={{
                color: "#FFF",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
              }}
            >
              <h5>{captions[index]}</h5>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
  return (
    <>
      {/* <Container fluid className="login-container"> */}
      <Container fluid className="login-container">
        <Row className="master_div">
          <Col
            xl={6}
            lg={6}
            md={12}
            sm={12}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src={slide1}
              style={{
                height: "180px",
                alignItems: "center",
                marginTop: "-50px",
                textAlign: "center",
              }}
            />
            <div className="carousel-container" style={{ width: "100%" }}>
              <CustomCarousel />
            </div>
          </Col>

          <Col
            xl={6}
            lg={6}
            md={12}
            sm={12}
            className="form-container d-flex justify-content-center align-items-center"
          >
            <div
              //className="card rounded-2xl shadow-sm"
              className="loginWindow"
              style={{
                paddingTop: "30px",
                paddingBottom: "0",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              <div
                // xl={12}
                // lg={12}
                // md={12}
                // sm={12}
                className="login-form-col text-center mb-4"
              >
                <img
                  src={loginlogotop}
                  alt=""
                  style={{ marginBottom: "10px" }}
                />
                <h1 style={{ color: "rgb(48, 91, 133)" }}>Welcome back!</h1>
                <h5 style={{ color: "rgb(48, 91, 133)" }}>
                  Login to Your Account
                </h5>
              </div>

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    name="userName"
                    type="text"
                    placeholder="Username"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    label={<span>Remember me</span>}
                  />
                  <Form.Label style={{ textDecoration: "underline" }}>
                    forgot password
                  </Form.Label>
                </Form.Group>

                <Form.Group className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="outline-primary"
                    className="ml-2"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                  >
                    Register
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="ml-2"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Form.Group>
              </Form>
              <h6 className="text-center mt-5">www.aizenalgo.com</h6>
            </div>
          </Col>
        </Row>
      </Container>
      {/* </Container> */}
    </>
  );
}

export default LoginScreen;