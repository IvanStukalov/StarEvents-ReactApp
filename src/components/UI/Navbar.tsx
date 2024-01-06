import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

interface Props {
  path: string,
  slug: string,
}

const NavBar: React.FC<Props> = ({ path, slug }) => {
  const { login, isAuthorized, resetUser } = useUser();

  const logout = () => {
    api.api.logoutCreate();
    resetUser();
  }

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

      <Container className="navbar__container">
        <Link to="/">
          <Navbar.Brand>Эволюция ближайших к Солнцу звезд</Navbar.Brand>
        </Link>
        <div className="divider"/>
        <Link to="/orders">
          <Navbar.Brand>Заявки</Navbar.Brand>
        </Link>
      </Container>

      {!isAuthorized ?
        <>
          <Link className="navbar_item" to="/auth">
            <Button variant="primary">Войти</Button>
          </Link>

          <Link className="navbar_item" to="/reg">
            <Button variant="secondary">Регистрация</Button>
          </Link>
        </>
        :
        <>
          <h5>{login}</h5>
          <Link className="navbar_item" to="/cart">
            <img src="src/assets/basket.svg" alt="" className="icon" />
          </Link>

          <Link className="navbar_item" to="/star">
            <Button variant="secondary" onClick={logout}>Выйти</Button>
          </Link>
        </>
      }

    </Navbar>
  );
}

export default NavBar;
