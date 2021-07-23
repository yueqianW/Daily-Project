import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './index.less';

function Tabs() {
  return (
    <footer>
      <NavLink exact to="/">
        <span>11</span>
      </NavLink>
      <NavLink exact to="/mine">
        <span>22</span>
      </NavLink>
      <NavLink exact to="/profile">
        <span>33</span>
      </NavLink>
    </footer>
  );
}
export default withRouter(Tabs);
