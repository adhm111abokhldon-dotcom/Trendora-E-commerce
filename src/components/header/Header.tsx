import { Dispatch, SetStateAction } from "react";
import BtmHeader from "./btmHeader/BtmHeader";
import TopHeader from "./TopHeader";

type NavBarProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Navbar = ({ theme, setTheme }: NavBarProps) => {
  return (
    <>
      <TopHeader />
      <BtmHeader theme={theme} setTheme={setTheme} />
    </>
  );
};

export default Navbar;
