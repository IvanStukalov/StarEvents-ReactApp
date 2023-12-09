import { Breadcrumb } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      </Breadcrumb>

      <Container>
        <Link to="/">
          <Navbar.Brand>Эволюция ближайших к Солнцу звезд</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
