import BtmHeader from "./btmHeader/BtmHeader";
import TopHeader from "./TopHeader";

const Navbar = ({ theme, setTheme }) => {
  return (
    <>
      <TopHeader />
      <BtmHeader theme={theme} setTheme={setTheme} />
    </>
  );
};

export default Navbar;
