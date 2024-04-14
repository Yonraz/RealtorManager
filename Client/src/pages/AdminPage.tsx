import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import AddPropertyForm from "../features/Admin/AddPropertyForm";

export default function AdminPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="flex flex-col items-center">
      <AddPropertyForm />
    </div>
  );
}
