import "./ProfileScreen.css";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/counter/userSlice";
import { auth } from "../firebase";
import PlansScreen from "./PlansScreen";

export default function ProfileScreen() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="netflix_avatar"
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
