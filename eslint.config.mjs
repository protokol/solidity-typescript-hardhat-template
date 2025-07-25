import { defineConfig, globalIgnores } from "eslint/config"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import prettier from "eslint-plugin-prettier"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default defineConfig([
	globalIgnores([
		"**/node_modules",
		"**/coverage",
		"**/deployments",
		"**/artifacts",
		"**/cache",
		"**/typechain-types",
	]),
	{
		extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),

		plugins: {
			"@typescript-eslint": typescriptEslint,
			prettier,
		},

		languageOptions: {
			globals: {},
			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",
		},

		rules: {
			"prettier/prettier": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
		},
	},
])
