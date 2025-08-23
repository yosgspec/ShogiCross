#!/bin/bash
# エラーが発生した場合、スクリプトを直ちに終了させる設定
set -e

echo "Setup Google Cloud"

#==============================================================================
# GitHub Actionsから渡される環境変数
#==============================================================================
# GCP_ID          : Google CloudプロジェクトID
# GCP_RUN_NAME    : Cloud Runのサービス名
# GCP_DOCKER_REPO : Artifact Registryのリポジトリ名
#==============================================================================

# スクリプト内で使用する変数を定義
# このサービスアカウントは、CI/CDの実行とCloud Runのランタイムの両方を担当します。
# そのため、このアカウントは事前にGCP上で手動で作成されている必要があります。
SERVICE_ACCOUNT="${GCP_RUN_NAME}@${GCP_ID}.iam.gserviceaccount.com"
REGION="asia-northeast1"

#==============================================================================
# サービスアカウントの存在チェック
#==============================================================================
# このスクリプトを実行するための認証に使っているサービスアカウント自体が存在するか確認します。
# 存在しない場合は、手動での作成を促して、ワークフローを安全に停止します。
#==============================================================================
echo "Try Exists GCP Service Account: $SERVICE_ACCOUNT"
if ! gcloud iam service-accounts describe $SERVICE_ACCOUNT --project $GCP_ID >/dev/null 2>&1; then
  echo "[ERROR] Not Found Service Account: $SERVICE_ACCOUNT"
  exit 1
else
  echo "Exists GCP Service Account"
fi

#==============================================================================
# IAM権限の付与
#==============================================================================
# サービスアカウントに必要な権限（ロール）を付与します。
# add-iam-policy-bindingは冪等性があり、すでに権限が存在する場合は何もしません。
#==============================================================================

echo "Update IAM Roles"
gcloud projects add-iam-policy-binding $GCP_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/artifactregistry.reader"
gcloud projects add-iam-policy-binding $GCP_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/artifactregistry.writer"
gcloud projects add-iam-policy-binding $GCP_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/cloudbuild.builds.builder"
gcloud projects add-iam-policy-binding $GCP_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/iam.serviceAccountUser"
gcloud projects add-iam-policy-binding $GCP_ID --member="serviceAccount:$SERVICE_ACCOUNT" --role="roles/run.sourceDeveloper"

#==============================================================================
# Artifact Registryリポジトリの作成
#==============================================================================
# CI/CDでビルドしたDockerイメージを保存・管理するためのリポジトリを作成します。
# すでに存在する場合は何もしません。
#==============================================================================
echo "Create Docker Repositorie: $GCP_DOCKER_REPO"
if ! gcloud artifacts repositories describe $GCP_DOCKER_REPO --location=$REGION --project $GCP_ID >/dev/null 2>&1; then
  echo "Create Artifact Registry Repositorie"
  gcloud artifacts repositories create $GCP_DOCKER_REPO \
    --repository-format="docker" \
    --location="$REGION" \
    --description="Docker images for $GCP_RUN_NAME" \
    --project="$GCP_ID"
else
  echo "Exists Artifact Registry Repositorie"
fi

echo "Setup Google Cloud Success"