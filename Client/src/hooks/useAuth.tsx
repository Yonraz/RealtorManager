import { useState, useCallback, useEffect } from "react";
import axios from "axios";
let logoutTimer: ReturnType<typeof setTimeout>;

interface UserAuthData {
  userId: string;
  token: string;
  refreshToken: string;
  expiration: string;
  username: string;
}
export const useAuth = () => {
  const [token, setToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");

  const login = useCallback(
    async (uid: string, token: string, refreshToken: string, name: string) => {
      setToken(token);
      setRefreshToken(refreshToken);
      setUserId(uid);
      setName(name);
      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 15
      );
      setTokenExpirationDate(tokenExpirationDate);
      const userData = {
        userId: uid,
        token,
        refreshToken,
        expiration: tokenExpirationDate.toISOString(),
        name,
      };
      if (localStorage.getItem("userName")) {
        localStorage.removeItem("userName");
      }
      localStorage.setItem("userData", JSON.stringify(userData));
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setRefreshToken("");
    setTokenExpirationDate(null);
    setUserId("");
    setName("");
    localStorage.removeItem("userData");
  }, []);

  const refresh = useCallback(async (refreshToken: string): Promise<string> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/refresh",
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const storedDataJSON = localStorage.getItem("userData");

    if (storedDataJSON) {
      const storedData: UserAuthData = JSON.parse(storedDataJSON);
      if (storedData && storedData.token && storedData.userId) {
        const fetchData = async () => {
          const accessToken = await refresh(storedData.refreshToken);
          login(
            storedData.userId,
            accessToken,
            storedData.refreshToken,
            storedData.username
          );
        };
        fetchData();
      }
    }
  }, [login]);

  useEffect(() => {
    if (token && refreshToken && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        refresh(refreshToken);
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, refreshToken, tokenExpirationDate, login, logout]);

  useEffect(() => {
    const handleFocus = async () => {
      const storedDataJSON = localStorage.getItem("userData");
      console.log(storedDataJSON);
      if (storedDataJSON) {
        const storedData: UserAuthData = JSON.parse(storedDataJSON);
        if (new Date(storedData.expiration) < new Date()) {
          console.log("Token expired. Attempting to refresh...");
          try {
            const accessToken = await refresh(storedData.refreshToken);
            login(
              storedData.userId,
              accessToken,
              storedData.refreshToken,
              storedData.username
            );
          } catch (error) {
            console.error("Error during token refresh:", error);
            logout();
          }
        }
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [login, logout, refresh]);

  return { token, login, logout, userId, name };
};
