import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CounterPage from "./pages/CounterPage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./store/auth.reducer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route element={<ProtectedRoute redirectTo="/" />}>
              <Route path="/product/:id" element={<ProductPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = localStorage.authToken;

    if (isAuthenticated) {
      dispatch(setIsAuthenticated());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
