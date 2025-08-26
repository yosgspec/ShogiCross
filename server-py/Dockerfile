# ベースイメージ
FROM python:3.10-slim-buster

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係のインストール
COPY pyproject.toml .
RUN pip install --no-cache-dir .

# アプリケーションのコピー
COPY server.py .

# ポートの公開
ENV PORT 8080
EXPOSE 8080

# エントリーポイントの設定
CMD ["python", "server.py"]
