import "./App.css";
import AppRouter from "./routes/appRouter.tsx/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  return (
    <>
      <AuthContext.Provider value={{ ...auth, isLoggedIn: !!auth.token }}>
        <AppRouter />
      </AuthContext.Provider>
    </>
  );
}

export default App;
