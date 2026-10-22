import LoginPage from "./pages/login/login";
import RegPage from "./pages/registration/registration";
import Router from "./routing/Router";

const router = new Router(".app");

router
  .use("/", RegPage)
  .use("/login", LoginPage)
  .use("/registration", RegPage)
  .start();
