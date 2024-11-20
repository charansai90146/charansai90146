import { Form, Button, Container, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { candidates, candidatesget, deleteCandidate, putCandidate } from './Services';
import { useEffect, useState } from 'react';
import DataGrid, { Column,   } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

const MainComponent = () => {

    const [fdata, setFData] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
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
       
        if(selectedCandidate){
          console.log(selectedCandidate)
          alert('dtfghfghf')
          const data = {
            Id:selectedCandidate?.id,
            FullName: myformik.values.fullName,
            Mobile: myformik.values.mobile,
            Email: myformik.values.email,
            Age: myformik.values.age,
            BloodGroup: myformik.values.bloodGroup,
            Address: myformik.values.address
          };
          putCandidate(selectedCandidate?.id,data).subscribe({
            next:(response:any)=>{
              if (response.status === 204) {
                
                setCount(count + 1);
              }
            }
          })
        }else{
          const data = {
            FullName: myformik.values.fullName,
            Mobile: myformik.values.mobile,
            Email: myformik.values.email,
            Age: myformik.values.age,
            BloodGroup: myformik.values.bloodGroup,
            Address: myformik.values.address
          };
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
  
    const insertCall = () => {
      myformik.handleSubmit(); 
    };
    const[count, setCount]=useState(0)
    useEffect(() => {
      candidatesget().subscribe({
        next: (response) => {
          if (response.status === 200) {
            setFData(response.data);
          }
        },
        error: (err) => {
          console.error("Error fetching data:", err);
        }
      });
    }, [count]); 
  
  
    const handleDelete = (id) => {
      deleteCandidate(id).subscribe({
        next: (response) => {
          if (response.status === 204) {
              setCount(count + 1);
          }
      },
        error: (error) => {
          console.error('Error deleting candidate:', error);
        }
      });
    };
   
    return (
        <Container>
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
        
      </div>

      {/* Data Grid */}
      <div>
        <DataGrid
         dataSource={fdata}
         keyExpr="id"
         showBorders={true}
       
         allowColumnResizing={true}
         paging={{ pageSize: 5 }}
         
        >
          <Column dataField="fullName" caption="Full Name" />
          <Column dataField="email" caption="Email" />
          <Column dataField="mobile" caption="Mobile" />
          <Column dataField="age" caption="Age" />
          <Column dataField="bloodGroup" caption="BloodGroup" />
          <Column dataField="address" caption="Address" />
          
       
          <Column
            caption="Actions"
            cellRender={(data) => (
             <>
              <Button 
                variant="danger" 
                onClick={() => handleDelete(data.data.id)}>
                Delete
              </Button>
              <Button
        variant="primary"
        onClick={() => {
          setSelectedCandidate(data.data); 
          myformik.setValues({
            fullName: data.data.fullName,
            email: data.data.email,
            mobile: data.data.mobile,
            age: data.data.age,
            address: data.data.address,
            bloodGroup: data.data.bloodGroup,
          });
        }}
      >
        Edit
      </Button>
           
             </>
            )}
          />
        </DataGrid>
      </div>
    </Container>
    );
};

export default MainComponent;