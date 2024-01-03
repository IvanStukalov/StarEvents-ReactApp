import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface Props {
  path: string,
  slug: string,
}

const NavBar: React.FC<Props> = ({ path, slug }) => {
  console.log(path, slug)

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">

      <Link to="/" className="breadcrump__item breadcrump__part">Звезды</Link>

      {slug ?
        <Link to={path} className="breadcrump__item">
          <div className="breadcrump__part">/</div>
          <div className="breadcrump__part">{slug}</div>
        </Link>
        : path &&
        <Link to={path} className="breadcrump__item">
          <div className="breadcrump__part">/</div>
          <div className="breadcrump__part">{path}</div>
        </Link>
      }

      <Container>
        <Link to="/">
          <Navbar.Brand>Эволюция ближайших к Солнцу звезд</Navbar.Brand>
        </Link>
      </Container>

      <Link className="navbar_item" to="/auth">
        <Button variant="primary">Войти</Button>
      </Link>

      <Link className="navbar_item" to="/reg">
        <Button variant="secondary">Регистрация</Button>
      </Link>
    </Navbar>
  );
}

export default NavBar;
