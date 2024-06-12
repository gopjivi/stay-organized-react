export default function navbartoggle() {
  return (
    <nav
      className="navbar navbar-light border-bottom-0 pt-0 "
      style={{ marginBottom: 3, paddingtop: 0 }}
    >
      <button
        className="navbar-toggler d-block d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
        aria-controls="sidebar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}
