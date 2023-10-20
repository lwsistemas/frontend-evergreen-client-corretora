import React from 'react';
import { Nav, Navbar, NavDropdown, Col, Row, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/MegaMenu.css';

function MegaMenu() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#pricing">shoes</Nav.Link>
              <Nav.Link href="#features">handbags</Nav.Link>
              <Nav.Link href="#pricing">jewelry & accessories</Nav.Link>
              <Nav.Link href="#pricing">men</Nav.Link>
              <Nav.Link href="#pricing">kids</Nav.Link>
              <Nav.Link href="#pricing">home</Nav.Link>
              <Nav.Link href="#pricing">sale</Nav.Link>

              <NavDropdown title="women" id="basic-nav-dropdown">
                <Container className="eventsNav pt-0 mt-0">
                  <Row>
                    <Col xs="12" md="4" className="text-left">
                      <Dropdown.Header>Catering</Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Corporate
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Private
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Classes</Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Barista 101
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            History of Coffee
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Intro to Cafe Snobbery
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider className="d-md-none" />
                    </Col>

                    <Col xs="12" md="4" className="text-left">
                      <Dropdown.Header>Rentals</Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Fireside Room
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Roasting Room
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Seasonal</Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Coldbrew Night
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link text-wrap" role="button">
                            Campfire Coffee Class
                          </a>
                        </Link>
                      </Dropdown.Item>
                    </Col>
                    <Col xs="12" md="4" className="text-left">
                      <Dropdown.Header>Rentals</Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Fireside Room
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Roasting Room
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Seasonal</Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link" role="button">
                            Coldbrew Night
                          </a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/">
                          <a className="nav-link text-wrap" role="button">
                            Campfire Coffee Class
                          </a>
                        </Link>
                      </Dropdown.Item>
                    </Col>
                  </Row>
                </Container>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MegaMenu;
