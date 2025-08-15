import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/account-recovery.tsx"),
  route("change-keys", "routes/change-keys.tsx"),
] satisfies RouteConfig;
