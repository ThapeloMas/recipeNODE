import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("token");
  return token ? true : false;
};

export default useAuth;
