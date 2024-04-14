import React, { useContext, useEffect } from "react";
import { useHttpClient } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
interface LoginResponse {
  userId: string;
  token: string;
  refreshToken: string;
  username: string;
}

interface FormFields {
  email: string;
  name: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const name: string | null = localStorage.getItem("name");
    if (name) {
      setValue("name", name);
    }
  }, [setValue]);

  const onSubmit = (data: FormFields) => {
    const { email, password } = data;
    const handleLogin = async () => {
      try {
        const loginResponseData = await sendRequest<LoginResponse>(
          `http://localhost:3000/api/admin/login`,
          "POST",
          {
            email,
            password,
          }
        );
        auth.login(
          loginResponseData.userId,
          loginResponseData.token,
          loginResponseData.refreshToken,
          loginResponseData.username
        );
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };

    handleLogin();
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="flex flex-col items-center justify-center h-1/2 bg-white">
        <h4 className="text-brown mb-2">כניסת משתמש</h4>
        <form>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
            type="text"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "אי-מייל לא תקין",
              },
            })}
            placeholder="אי-מייל"
          />
          {errors.email && <div>{errors.email.message}</div>}
          <input
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            placeholder="סיסמה"
          />
          {errors.password && <div>{errors.password.message}</div>}
          <div>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-4 py-2 w-1/4 mt-3"
            >
              כניסה
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
