import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off", // ✅ Allow require()
      "@typescript-eslint/no-unused-vars": "off", // ✅ Allow unused vars
      "@typescript-eslint/no-unused-expressions": "off", // ✅ Allow unused expressions
    },
  },
];

export default eslintConfig;
