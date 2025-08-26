# Node.jsの公式イメージを使用
FROM node:20-slim

# アプリケーションのディレクトリを設定
WORKDIR /app

# package.json と package-lock.json (存在する場合) をコピーして依存関係をインストール
# これにより、依存関係が変更されない限りキャッシュが利用され、ビルドが高速化されます
COPY package*.json ./
RUN npm install --production

# アプリケーションのソースコードをコピー
COPY . .

# ポートの公開
ENV PORT 8080
EXPOSE 8080

# アプリケーションを起動
CMD ["npm", "start"]
