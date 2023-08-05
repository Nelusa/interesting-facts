interface HeaderProps {
  onShowForm: () => void;
  showForm: boolean;
}

const Header = ({ onShowForm, showForm }: HeaderProps) => {
  return (
    <header className="header">
      <img
        className="logo"
        src="logo.png"
        height="68"
        width="68"
        alt="Today I Learned Logo"
      />
      <h1>Today I Learned</h1>
      <button onClick={onShowForm} className="btn btn-large btn-open">
        {showForm ? "Close" : "Share a Fact"}
      </button>
    </header>
  );
};
export default Header;
