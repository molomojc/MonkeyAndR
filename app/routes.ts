import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/Login.tsx"),
    route("register", "routes/Register.tsx"),
    route("dashboard", "routes/Dashboard.tsx"),
    route("profile", "routes/profile.jsx"),
    route("About", "routes/About.jsx"),
    route("diagnose", "routes/diagnose.jsx")
] satisfies RouteConfig;
