import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "About" },
    { path: "/experience", label: "Experience" },
    { path: "/writing", label: "Writing" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(`${path}/`));

  return (
    <header className="pt-12 pb-8 md:pt-16 md:pb-12">
      <nav className="container">
        <ul className="flex items-center gap-8 font-sans text-small">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
