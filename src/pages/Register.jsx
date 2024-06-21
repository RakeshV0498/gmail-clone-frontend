import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsCalendar,
  BsEnvelope,
  BsKey,
} from "react-icons/bs";
import { useFormContext } from "../context/FormContext";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Register = () => {
  const { formState, setFormState } = useFormContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      birthMonth: "",
      birthYear: "",
      emailOption: "auto",
      customEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      birthDate: Yup.number().required("Date is required").min(1).max(31),
      birthMonth: Yup.string().required("Month is required"),
      birthYear: Yup.number()
        .required("Year is required")
        .min(1900)
        .max(new Date().getFullYear()),
      customEmail: Yup.string().when("emailOption", {
        is: "custom",
        then: Yup.string()
          .required("Custom email is required")
          .email("Invalid email format"),
      }),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      setFormState({
        ...formState,
        ...values,
        email:
          values.emailOption === "auto"
            ? `${values.firstName}.${values.lastName}@gmail.com`
            : values.customEmail,
      });
    },
  });

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsFillPersonFill />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  isInvalid={
                    !!formik.errors.firstName && formik.touched.firstName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsFillPersonFill />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  isInvalid={
                    !!formik.errors.lastName && formik.touched.lastName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="birthMonth">
              <Form.Label>Month</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendar />
                </InputGroup.Text>
                <Form.Control
                  as="select"
                  {...formik.getFieldProps("birthMonth")}
                  isInvalid={
                    !!formik.errors.birthMonth && formik.touched.birthMonth
                  }
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.birthMonth}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="birthDate">
              <Form.Label>Date</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendar />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("birthDate")}
                  isInvalid={
                    !!formik.errors.birthDate && formik.touched.birthDate
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.birthDate}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="birthYear">
              <Form.Label>Year</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendar />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("birthYear")}
                  isInvalid={
                    !!formik.errors.birthYear && formik.touched.birthYear
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.birthYear}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="emailOption">
          <Form.Label>Email</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label={`${formik.values.firstName}.${formik.values.lastName}@gmail.com`}
              id="autoEmail"
              value="auto"
              checked={formik.values.emailOption === "auto"}
              onChange={() => formik.setFieldValue("emailOption", "auto")}
            />
            <Form.Check
              type="radio"
              label="Custom Email"
              id="customEmail"
              value="custom"
              checked={formik.values.emailOption === "custom"}
              onChange={() => formik.setFieldValue("emailOption", "custom")}
            />
            {formik.values.emailOption === "custom" && (
              <InputGroup className="mt-2">
                <InputGroup.Text>
                  <BsEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("customEmail")}
                  isInvalid={
                    !!formik.errors.customEmail && formik.touched.customEmail
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.customEmail}
                </Form.Control.Feedback>
              </InputGroup>
            )}
          </div>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <BsKey />
            </InputGroup.Text>
            <Form.Control
              type="password"
              {...formik.getFieldProps("password")}
              isInvalid={!!formik.errors.password && formik.touched.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
