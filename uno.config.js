// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  rules: [
    //Colors
    ["bg-green-message", { background: "#96f8a2" }],
    ["bg-sort-btn", { background: "rgb(147, 177, 214)" }],
    ["bg-delete-btn", { background: "rgb(250, 57, 57)" }],
    ["border-btn", { borderColor: "rgb(100, 100, 100)" }],
    ["text-burger", { Color: "rgb(238, 238, 238)" }],
  ],
});
