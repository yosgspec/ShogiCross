import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin"; // 追加

export default [
	{
		// グローバル変数とパーサーの設定
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 12,
				sourceType: "module",
			},
		},
		// プラグインの設定
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			"@stylistic": stylistic, // 追加
		},
		// 無視するファイル/ディレクトリの設定
		ignores: ["cdn/**/*.js", "cdn/**/*.d.ts", "src/dist/", "src/ShogiCross/data/"],
	},
	// 推奨設定を適用
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		// カスタムルールを適用 (推奨設定を上書きするため、最後に配置)
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			// インデント: タブを使用し、タブ幅は4
			"indent": ["error", "tab", {"SwitchCase": 1}], // TABベースに変更
			// セミコロン: 常に使用
			"semi": ["error", "always"],
			// クォーテーション: ダブルクォーテーションを使用
			"quotes": ["error", "double"],
			// 算術演算子のスペース: スペースなしを許可 (ESLintのデフォルトルール)
			"space-infix-ops": "off", // off に変更

			// @stylistic ルールで算術演算子のスペースを制御
			"@stylistic/space-infix-ops": "off", // 二項演算子の周りのスペースを許可しない
			"@stylistic/space-unary-ops": ["error", {"words": true, "nonwords": false}], // 単項演算子の周りのスペースを許可しない

			// trailing comma: 常に使用
			"comma-dangle": ["error", {
				"arrays": "always-multiline",
				"objects": "always-multiline",
				"imports": "always-multiline",
				"exports": "always-multiline",
				"functions": "never",
			}],
			// オブジェクトリテラルの括弧内にスペースを入れる
			"object-curly-spacing": ["error", "never"], // never に変更
			// アロー関数の引数が1つの場合でも括弧を付ける
			"arrow-parens": ["error", "as-needed"], // as-needed に変更

			// 既存コードのエラーを無視するためのルール調整
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"no-unused-private-class-members": "off",
			"no-irregular-whitespace": "off",
			"no-empty": "off",
			"no-case-declarations": "off",
			"no-redeclare": "off",
			"no-undef": "off",
			"@typescript-eslint/no-this-alias": "off",
			"no-useless-escape": "off",
			"@typescript-eslint/no-require-imports": "off",
		},
	},
	{
		// coreディレクトリのみに適用する厳格なルール
		files: ["src/ShogiCross/core/**/*.js"],
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			"@stylistic/keyword-spacing": ["error", {
				"before": false,
				"after": true,
				"overrides": {
					"if": {"after": false},
					"for": {"after": false},
					"while": {"after": false},
					"switch": {"after": false},
					"catch": {"after": false},
					"try": {"after": false},
					"finally": {"after": false},
					"do": {"after": false},
					"from": {"before": true},
				},
			}],
			"@stylistic/space-before-blocks": ["error", "never"],
			"@stylistic/space-before-function-paren": ["error", "never"],
			"@stylistic/brace-style": ["error", "stroustrup"],
			"@stylistic/arrow-spacing": ["error", {"before": false, "after": false}],
			"@stylistic/no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0}],
			"@stylistic/comma-spacing": ["error", {"before": false, "after": true}],
		},
	},
];