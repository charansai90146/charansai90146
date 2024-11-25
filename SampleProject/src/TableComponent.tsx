import DataGrid, { Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import {  Button } from 'react-bootstrap';

const TableComponent = ({fdata,handleDelete, setSelectedCandidate, myformik}) => {
    return (
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
          <Column dataField="userId" caption="User ID" /> 
          <Column dataField='userName' caption='UserName' />
          <Column
            caption="Actions"
            cellRender={(data) => (
              <>
                <Button variant="danger" onClick={() => handleDelete(data.data.id)}>
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
    );
};

export default TableComponent;