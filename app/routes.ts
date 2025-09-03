import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/change-keys.tsx"),
  route("account-recovery", "routes/account-recovery.tsx"),
] satisfies RouteConfig;
