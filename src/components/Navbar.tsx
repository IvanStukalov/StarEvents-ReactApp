import { Breadcrumb } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface Props {
  path: String | undefined,
}

const NavBar: React.FC<Props> = ({ path }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        { path?.length &&
          <Breadcrumb.Item href="/:id">{path}</Breadcrumb.Item>
        }
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
