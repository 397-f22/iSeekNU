const Navbar = ({isHomepage, setHomepage}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "65px",
        backgroundColor: "#4E2A84",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!isHomepage && <button onClick={() => setHomepage(true)} style={{backgroundColor: "transparent", position: "fixed", top: "0", left: "0"}}>
        <span style={{
          color: "white",
          fontSize: "30px",
          fontWeight: "bolder"
        }}> {"❮"} </span>
      </button>}
      <span
        style={{
          color: "white",
          alignSelf: "center",
          fontFamily: "Poppins",
          fontSize: "30px",
          fontWeight: "bolder",
        }}
      >
        iSeekNU
      </span>
    </div>
  );
};

export default Navbar;
