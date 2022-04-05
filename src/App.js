import "./App.scss";
import Copyright from "./Components/copyright";
import Navbar from "./Components/navbar3";
import ContactUs from "./Components/ContactUs";
import Blogtiles from "./Components/Blocktiles/Blocktiles";
import About from "./Components/About";
import Register from "./Components/Register";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import WritePage from "./Components/WritePage2";
import SinglePost from "./Components/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" element={<Blogtiles />} />

          <Route path="/Login" element={<Login />} />

          <Route path="/Register" element={<Register />} />

          <Route path="/About" element={<About />} />
          <Route
            path="/Write"
            element={
              <PrivateRoute>
                <WritePage />
              </PrivateRoute>
            }
          />
          <Route path="/Post/:postId" element={<SinglePost />} />
        </Switch>
        <ContactUs />
        <Copyright />
      </Router>
    </AuthProvider>
  );
}

export default App;
