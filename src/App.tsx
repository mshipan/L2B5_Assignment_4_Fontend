import { RouterProvider } from "react-router";
import router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
