import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const getUser = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user;
    }
    return null;
  };

  const userName = getUser().fullName.split(" ")[1];

  return (
    <div
      onClick={logout}
      className="flex items-center gap-4 text-black dark:text-white absolute top-[10%] right-[3%]"
    >
      <h1 className="text-2xl font-bold">{userName}</h1>
      <LogOut />
    </div>
  );
}
