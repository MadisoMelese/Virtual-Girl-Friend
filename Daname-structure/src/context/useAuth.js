// filepath: c:\Users\Madi\Desktop\Daname\Daname-structure\src\context\useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;