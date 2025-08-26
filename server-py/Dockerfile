# ベースイメージ
FROM python:3.10-slim-buster

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのコピー
COPY server.py .

# ポートの公開
EXPOSE 8080

# エントリーポイントの設定
CMD ["python", "server.py"]
