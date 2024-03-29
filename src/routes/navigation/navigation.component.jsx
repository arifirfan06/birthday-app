import { Fragment} from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartIsOpen } from '../../store/cart/cart.selector';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { signOutUser } from '../../utils/firebase/firebase.utils';

// import './navigation.styles.scss';
import { Nav, NavLink, NavLinks,LogoCtn } from './navigation'

const Navigation = () => {
  const isCartOpen = useSelector(selectCartIsOpen)
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <Fragment>
      <Nav>
        <LogoCtn to='/'>
          <CrwnLogo className='logo' />
        </LogoCtn>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </Nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
