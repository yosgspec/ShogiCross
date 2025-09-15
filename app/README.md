# Tauri + Vanilla

This template should help get you started developing with Tauri in vanilla HTML, CSS and Javascript.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Android Release Build

このプロジェクトは、GitHub Actions経由でAndroid用のリリースAPKをビルドするように設定されています。

### 署名の前提条件

リリースビルドには、アプリへの署名が必須です。署名に必要な情報は、GitHub ActionsのSecretsとしてリポジトリに保存されています。

### 必要なGitHub Secrets

リポジトリの `Settings > Secrets and variables > Actions` に、以下のシークレットが設定されている必要があります。

- `TAURI_KEY_JKS_BASE64`: 署名キーファイル (`.jks`) をBase64形式でエンコードした文字列。
- `TAURI_KEY_PASSWORD`: 署名キーのキーストアパスワード。
- `TAURI_KEY_ALIAS`: 署名キーのエイリアス (例: `shogicross`)。
- `TAURI_KEY_ALIAS_PASSWORD`: 署名キーのエイリアスパスワード。

### 署名キーを再生成する方法

万が一、署名キーを再生成する必要がある場合は、Google Cloud Shellを使用するのが簡単です。

**注意:** アプリのアップデートには常に同じキーを使う必要があります。新しいキーを生成するのは、最初の設定時か、キーを完全に紛失した場合のみです。

1.  [Google Cloud Shell](https://shell.cloud.google.com/) を開きます。
2.  以下のスクリプトを実行します。**実行する前に必ずパスワードを変更してください。**

```sh
# --- 設定項目: パスワードとエイリアス ---
# ★★★ このパスワードは、より強力なものに変更してください ★★★
KEY_PASSWORD="change-this-strong-password"
KEY_ALIAS="shogicross"
KEYSTORE_FILE="shogicross.jks"

# --- ステップ1: 署名キーを生成する ---
echo "--- 署名キーを生成しています... ---"
keytool -genkey -v \
  -keystore "${KEYSTORE_FILE}" \
  -alias "${KEY_ALIAS}" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass "${KEY_PASSWORD}" \
  -keypass "${KEY_PASSWORD}" \
  -dname "CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown"

# --- ステップ2: Base64文字列に変換して表示する ---
echo "--- Base64文字列に変換しています... ---"
BASE64_KEYSTORE=$(base64 -w 0 "${KEYSTORE_FILE}")

# --- ステップ3: 登録すべき情報を表示する ---
echo "★★★【重要】★★★"
echo "以下の値をコピーし、GitHubリポジトリのSecretsに登録してください。"
# (表示内容は省略)

# --- クリーンアップ ---
rm "${KEYSTORE_FILE}"
echo "--- 完了しました。 ---"
```

### ビルドコマンド

ビルドは、`package.json` に定義された `build-apk` スクリプトを実行することでトリガーされます。

```sh
npm run build-apk
```
