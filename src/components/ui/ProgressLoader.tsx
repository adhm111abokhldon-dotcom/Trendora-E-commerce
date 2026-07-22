import NProgress from "nprogress";
import { useEffect } from "react";

const ProgressLoader = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return null;
};

export default ProgressLoader;
