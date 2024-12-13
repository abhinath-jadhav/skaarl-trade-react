import { useEffect, useState } from "react";
import { authorise } from "../../service/Authservice";
const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await authorise();

      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center pb-4">
      {user?.avatar ? (
        <img
          className="rounded-full"
          src={user.avatar}
          referrerPolicy="no-referrer"
          alt="Profile"
        />
      ) : null}
      <h1 className="text-2xl font-bold">{user?.name}</h1>
      <p className="text-sm text-slate-500">{user?.email}</p>
    </div>
  );
};

export default Profile;
