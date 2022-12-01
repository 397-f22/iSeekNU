const Navbar = () => {
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
      {<button onClick={() => window.location.href = "/"} style={{backgroundColor: "transparent", top: "0"}}>
        <span style={{
          color: "white",
          alignSelf: "center",
          fontFamily: "Poppins",
          fontSize: "30px",
          fontWeight: "bolder",
        }}> iSeekNU </span>
      </button>}
      
    </div>
  );
};

export default Navbar;
