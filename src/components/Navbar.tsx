import { Show, SignInButton, UserButton } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";

const Navbar = () => (
  <nav className="navbar">
    <div className="brand">
      <div className="mark">
        <div className="glyph" />
      </div>
      <Link to="/">
        <span>Skild</span>
      </Link>
    </div>

    <div className="actions">
      <Show when="signed-in">
        <UserButton />
      </Show>
      <Show when="signed-out">
        <SignInButton mode="modal" />
      </Show>
      {/*<Link to="/sign-in/$" className="btn-primary">*/}
      {/*	<LogIn size={16} />*/}
      {/*	Sign in*/}
      {/*</Link>*/}
    </div>
  </nav>
);

export default Navbar;
