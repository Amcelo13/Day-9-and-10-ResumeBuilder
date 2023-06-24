import { Route, Routes, BrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OTP from "./pages/OTP";
import { useSelector } from "react-redux";
import Details from "./pages/Details";
function App() {
  const signed_state = useSelector((state) => state.isLoggedIn);

  let public1 = [
    { path: "/", element: <Login /> },
    {
      path: "/otp",
      element: <OTP />,
    },
  ];

  let private1 = [
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/form",
      element: <Details />,
    },
  ];


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {private1.map((e, i) => {
            return (
              <Route
                key={i}
                path={e.path}
                element={
                  <Protected signed_state={signed_state}>{e.element}</Protected>
                }
              />
            );
          })}
          {public1.map((e, i) => {
            return (
              <Route key={i} path={e.path} element={e.element} id={e.id} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
