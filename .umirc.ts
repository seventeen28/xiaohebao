import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/transferIn", component: "transferIn" },
  ],
  npmClient: 'npm',
  title : '小荷包'
});
