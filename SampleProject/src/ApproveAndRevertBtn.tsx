import { Button } from "react-bootstrap";


const ApproveAndRevertBtn = () => {
    return (
        <div>
            <Button style={{background:'green', border:'green'}}   onClick={() => {
                  
                }}>Approve</Button>
            <Button style={{background:'red', border:"red"}}>Revert</Button>
        </div>
    );
};

export default ApproveAndRevertBtn;