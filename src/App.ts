import LoginPage from "./pages/login/login";
import Router from "./routing/Router";

const router = new Router(".app");

router.use("/", LoginPage).use("/users", LoginPage).start();

setTimeout(() => {
  console.log("777");
  router.go("/users");
}, 1000);
