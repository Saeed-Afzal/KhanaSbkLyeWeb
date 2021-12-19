import React, { useState, useRef } from "react"
import PostData from './post/food_bank.json'
// import { auth, db } from './contexts/firebase';
import { db } from "../firebase";


import {
  Card, Button, Alert, Navbar, Container, Nav, Modal,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Row, Col, Carousel
} from "react-bootstrap";
import DatePicker from 'react-date-picker';
// import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"
import logo from './images/logo.png';
import c1 from './images/1.jpg';
import c2 from './images/2.jpg';
import c3 from './images/3.jpg';


const handleForm = (e) => {


  const name = "nameref.current.value";
  e.preventDefault()


    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      dataSubmit(name)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}



const dataSubmit = async (name, email) => {

  // const date = new Date();
  // const timeId = date.getTime().toString();
  // const data = {
  //   name: name,

  // }

  // await setDoc(doc(db, "AccountData", timeId), data).then(() => {
  //   console.log("data written successfully");

  //   nameref.current.value = ""

  // }).catch((e) => {
  //   console.log("error", e);
  // });
}





// import Carousel from "./carousal";

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      {/* <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}


      <Navbar>
        <Container>
          <Navbar.Brand href="#home"><img src={logo} alt="Logo" height="60px" /></Navbar.Brand>
          {/* <Nav.Link >Need Food</Nav.Link> */}
          <Example />
          &nbsp;&nbsp;

          <Bank />
          <Nav.Link href="#home">Food Bank</Nav.Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Text>Status:</Navbar.Text>
          <Nav.Link href="#home">Pending...</Nav.Link>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <strong>Email:</strong> {currentUser.email}
              &nbsp;&nbsp;
              <Button onClick={handleLogout}>Log Out</Button>
              {/* <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button> */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carousel >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c1}
            alt="First slide"

          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div>
        {PostData.map((postDetail, index) => {
          return <h1>{postDetail.branch_name}</h1>
        })}
      </div>
    </>
  )
}





function Example() {
  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState({
    name: "",
    fathername: "",
    cnic: "",
    DOB: "",
    familymember: "",
    helpCategory: "",
    timeyouneed: "",
    monthlyIncome: "",
  })
  // const name = nameref.current.value;


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {

    console.log(data);
    const date = new Date();
    const id = date.getTime().toString();
    db.collection("forms").doc(id).set(data)
      .then(() => {
        console.log("Document successfully written!");
        setShow(false)
        setData({
          name: "",
          fathername: "",
          cnic: "",
          DOB: "",
          familymember: "",
          helpCategory: "",
          timeyouneed: "",
          monthlyIncome: "",
        })
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    console.log(data);

  }

  return (
    <>
      <form onSubmit={handleForm}>
        <Button variant="success" onClick={handleShow}>
          Need Food
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            Fill this form to get food!
            <InputGroup className="mb-3">
              <InputGroup.Text required >Your Name</InputGroup.Text>
              <FormControl aria-label="Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Your Father Name</InputGroup.Text>
              <FormControl aria-label="Father Name" value={data.fathername} onChange={e => setData({ ...data, fathername: e.target.value })} />

            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Your CNIC Number</InputGroup.Text>
              <FormControl aria-label="CNIC" value={data.cnic} onChange={e => setData({ ...data, cnic: e.target.value })} />

            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Your Date of Birth</InputGroup.Text>

              <DatePicker
                onChange={onChange}
                value={value}
              //  onChange={e => setData({...data, DOB: e.target.value}) }
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Your Family Members</InputGroup.Text>
              <FormControl aria-label="No of Family Members" value={data.familymember} onChange={e => setData({ ...data, familymember: e.target.value })} />

            </InputGroup>


            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Choose Help Category</InputGroup.Text>
              <DropdownButton id="dropdown-basic-button" title="Select Type" value={data.helpCategory} onChange={e => setData({ ...data, helpCategory: e.target.value })} >
                <Dropdown.Item href="#/action-1">Monthly</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Yearly</Dropdown.Item>

              </DropdownButton>

            </InputGroup>


            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Times You Need</InputGroup.Text>
              <DropdownButton id="dropdown-basic-button" title="Select Type" value={data.timeyouneed} onChange={e => setData({ ...data, timeyouneed: e.target.value })}>
                <Dropdown.Item href="#/action-1">Daily 1 time</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Daily 2 times</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Daily 3 times</Dropdown.Item>


              </DropdownButton>

            </InputGroup>



            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Upload Your Image</InputGroup.Text>
              <input type="file" name="file" />
            </InputGroup>


            <InputGroup className="mb-3">
              <InputGroup.Text type="number">Upload Your CNIC front and Back Image</InputGroup.Text>
              <input type="file" name="file" />
            </InputGroup>


            <InputGroup className="mb-3">
              <InputGroup.Text>Your Monthly Income</InputGroup.Text>
              <FormControl aria-label="income" value={data.monthlyIncome} onChange={e => setData({ ...data, monthlyIncome: e.target.value })} />
            </InputGroup>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type='button' onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}




function Bank() {
  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Food Bank
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Food Banks</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <center> All Food Banks Available</center>

          <div>
            {PostData.map((postDetail, index) => {
              return <h6>
                <b> {postDetail.branch_name}</b>
                <p>Latitude: {postDetail.latitude} <br />
                  Longitude: {postDetail.longitude}</p>







              </h6>


            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
