import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { api } from '../../api';

interface Props {
  path: string,
  slug: string,
  draftId: number,
  setLoading: (loading: boolean) => void,
}

const NavBar: React.FC<Props> = ({ path, slug, draftId, setLoading }) => {
  const { login, isAuthorized, isAdmin, resetUser } = useUser();

  const logout = async () => {
    setLoading(true);
    const resGetDraft = await api.api.eventDetail(draftId);
    const draftStars = resGetDraft.data.star_list;
    if (draftStars && draftStars.length !== 0) {
      for (let star of draftStars) {
        await api.api.starEventStarIdDelete(star.star_id);
      }
    }
    try {
      await api.api.logoutCreate();
    } catch (error) {
      console.log("Ошибка выхода из аккаунта");
    }
    resetUser();
    setLoading(false);
  }

  const navigate = useNavigate();
  const toCart = () => {
    navigate(`/orders/${draftId}`)
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar">

      <div style={{width: "20%", display: "flex"}}>
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
      </div>

      <Container className="navbar__container">
        <Link to="/">
          <Navbar.Brand>Эволюция ближайших к Солнцу звезд</Navbar.Brand>
        </Link>

        <Link to="/">
          <Navbar.Brand>Звезды</Navbar.Brand>
        </Link>

        {
          isAuthorized &&
          <>
            <Link to="/orders">
              <Navbar.Brand>События</Navbar.Brand>
            </Link>

            {
              isAdmin &&
              <>
                <Link to="/starTable">
                  <Navbar.Brand>Таблица звезд</Navbar.Brand>
                </Link>
              </>
            }
          </>
        }
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
          {
            !isAdmin &&
            <Button onClick={toCart} disabled={draftId === 0} className="cart">Корзина</Button>
          }

          <Link className="navbar_item" to="/star">
            <div onClick={logout}>Выйти</div>
          </Link>
        </>
      }

    </Navbar>
  );
}

export default NavBar;
