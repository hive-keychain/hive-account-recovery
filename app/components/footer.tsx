const Footer = () => {
  return (
    <footer
      className="text-dark py-3 mt-auto"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container text-center">
        <div className="footer-text">@2023 Hive Keychain</div>
      </div>
    </footer>
  );
};

export default Footer;
