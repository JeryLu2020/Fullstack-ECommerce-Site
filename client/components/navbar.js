import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import { Button, Header, Input } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <NavLink to="/">
      <Header className="mainHeader" as="h1" size="huge" textAlign="center">
        {' '}
        Cody and Co.{' '}
      </Header>
    </NavLink>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">
            <Button color="orange">Home</Button>
          </NavLink>
          <NavLink to="/products">
            <Button color="orange">All Products</Button>
          </NavLink>
          <NavLink to="/cart">
            <Button>Cart</Button>
          </NavLink>
          <NavLink to="/myaccount">
            <Button>My Account</Button>
          </NavLink>
          {isAdmin && (
            <NavLink to="/orders">
              <Button>Company Orders</Button>
            </NavLink>
          )}
          <a href="#" onClick={handleClick}>
            <Button>Logout</Button>
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/">
            <Button color="orange">Home</Button>
          </NavLink>
          <NavLink to="/products">
            <Button color="orange">All Products</Button>
          </NavLink>
          <NavLink to="/login">
            <Button>Login</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button>Sign Up</Button>
          </NavLink>
          <NavLink to="/cart">
            <Button>Cart</Button>
          </NavLink>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
};
