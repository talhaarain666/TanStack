import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/cards"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          Cards
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/infinite"
          className={({ isActive }) =>
            isActive ? 'font-bold underline' : 'hover:underline'
          }
        >
          Infinite Scroll
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
