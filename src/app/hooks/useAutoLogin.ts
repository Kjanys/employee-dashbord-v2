// В файле hooks/useAutoLogin.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAutoLoginUserQuery } from "../store/api/api-employee";
import { login } from "../store/slices/userSlice";

export const useAutoLogin = () => {
  const dispatch = useDispatch();
  const { data: userData } = useAutoLoginUserQuery();

  useEffect(() => {
    if (userData) {
      dispatch(login(userData));
    }
  }, [userData, dispatch]);
};
