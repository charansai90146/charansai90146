import { Form, Button, Container, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { candidates, candidatesget, deleteCandidate, putCandidate } from './Services';
import { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import TableComponent from './TableComponent';
import ApproveAndRevertBtn from './ApproveAndRevertBtn';

const MainComponent = () => {
  const user = useUser(); // Get the current user
  const [fdata, setFData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [count, setCount] = useState(0);
console.log(fdata,'get')
  // Formik form handling
  const myformik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobile: '',
      age: '12',
      address: '',
      bloodGroup: ''
    },
    onSubmit: () => {
      const data = {
        FullName: myformik.values.fullName,
        Mobile: myformik.values.mobile,
        Email: myformik.values.email,
        Age: myformik.values.age,
        BloodGroup: myformik.values.bloodGroup,
        Address: myformik.values.address,
        UserId: user.user.id ,
        UserName:user.user.role,
      };
console.log(data,'setdat')
      if (selectedCandidate) {
        
        const updateData = {
          Id: selectedCandidate.id,
          ...data // Update other fields
        };
        putCandidate(selectedCandidate.id, updateData).subscribe({
          next: (response: any) => {
            if (response.status === 204) {
              setCount(count + 1);
            }
          },
          error: (err) => {
            console.error("Error updating data:", err);
          }
        });
      } else {
        // Add new candidate
        candidates(data).subscribe({
          next: (response) => {
            if (response.status === 201) {
              console.log(response.data, 'myData');
              setCount(count + 1);
            }
          },
          error: (err) => {
            console.error("Error submitting data:", err);
          }
        });
      }
      myformik.resetForm();
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required().trim(),
      email: Yup.string().required().trim(),
      mobile: Yup.string().required().trim(),
      address: Yup.string().required().trim(),
      age: Yup.string().required().trim(),
      bloodGroup: Yup.string().required().trim(),
    })
  });

  // Handle form submit
  const insertCall = () => {
    myformik.handleSubmit();
  };

  // Fetch candidates
  useEffect(() => {
    candidatesget().subscribe({
      next: (response) => {
        if (response.status === 200) {
          const updatedData = response.data.map((item:any) => ({
            ...item,
            Status: 1,
        }));
          setFData(updatedData);
        }
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
  }, [count]);

  // Handle candidate deletion
  const handleDelete = (id) => {
    deleteCandidate(id).subscribe({
      next: (response: any) => {
        if (response.status === 204) {
          setCount(count + 1);
        }
      },
      error: (error: any) => {
        console.error('Error deleting candidate:', error);
      }
    });
  };

  return (
    <Container>
      {/* Form to submit data */}
      <div>
        <Form.Group as={Col} xl={6} lg={6} md={6} sm={6}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={myformik.values.fullName}
            name="fullName"
            onChange={myformik.handleChange}
            isInvalid={!!myformik.errors.fullName && myformik.touched.fullName}
          />
          <Form.Control.Feedback type="invalid">{myformik.errors.fullName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xl={6} lg={6} md={6} sm={6}>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={myformik.values.mobile}
            name="mobile"
            onChange={myformik.handleChange}
            isInvalid={!!myformik.errors.mobile && myformik.touched.mobile}
          />
          <Form.Control.Feedback type="invalid">{myformik.errors.mobile}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xl={6} lg={6} md={6} sm={6}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={myformik.values.email}
            name="email"
            onChange={myformik.handleChange}
            isInvalid={!!myformik.errors.email && myformik.touched.email}
          />
          <Form.Control.Feedback type="invalid">{myformik.errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xl={6} lg={6} md={6} sm={6}>
          <Form.Label>Blood Group</Form.Label>
          <Form.Control
            type="text"
            value={myformik.values.bloodGroup}
            name="bloodGroup"
            onChange={myformik.handleChange}
            isInvalid={!!myformik.errors.bloodGroup && myformik.touched.bloodGroup}
          />
          <Form.Control.Feedback type="invalid">{myformik.errors.bloodGroup}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xl={6} lg={6} md={6} sm={6}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={myformik.values.address}
            name="address"
            onChange={myformik.handleChange}
            isInvalid={!!myformik.errors.address && myformik.touched.address}
          />
          <Form.Control.Feedback type="invalid">{myformik.errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" onClick={insertCall}>Submit</Button>
      
      <Col style={{ float: 'right', marginTop: '-50px' }}>
        {selectedCandidate && (
          <ApproveAndRevertBtn 
        
          />
        )}
      </Col>
       
        <TableComponent fdata={fdata} handleDelete={handleDelete}  setSelectedCandidate={setSelectedCandidate} 
          myformik={myformik} />
      </div>
    </Container>
  );
};

export default MainComponent;
