#!/usr/bin/env bash
set -euo pipefail

# 必填环境变量：
# DEPLOY_HOST, DEPLOY_USER, DEPLOY_PORT, REMOTE_BASE_DIR, BUILD_DIR
# 可选：KEEP_RELEASES (默认 5)

KEEP_RELEASES="${KEEP_RELEASES:-5}"
RELEASE_NAME="release-$(date +%Y%m%d-%H%M%S)-${GITHUB_SHA:-manual}"
REMOTE_RELEASE_DIR="${REMOTE_BASE_DIR%/}/releases/${RELEASE_NAME}"
REMOTE_CURRENT_LINK="${REMOTE_BASE_DIR%/}/current"

if [ -z "${DEPLOY_HOST:-}" ] || [ -z "${DEPLOY_USER:-}" ] || [ -z "${DEPLOY_PORT:-}" ] || [ -z "${REMOTE_BASE_DIR:-}" ] || [ -z "${BUILD_DIR:-}" ]; then
  echo "Missing required env vars. Need DEPLOY_HOST, DEPLOY_USER, DEPLOY_PORT, REMOTE_BASE_DIR, BUILD_DIR" >&2
  exit 1
fi

if [ ! -d "$BUILD_DIR" ]; then
  echo "BUILD_DIR '$BUILD_DIR' does not exist or is not a directory" >&2
  exit 1
fi

echo "Uploading build from ${BUILD_DIR} to ${DEPLOY_USER}@${DEPLOY_HOST}:${REMOTE_RELEASE_DIR}"

# 1) 确保远端目录存在
ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes "${DEPLOY_USER}@${DEPLOY_HOST}" "mkdir -p '${REMOTE_RELEASE_DIR}'"

# 2) 传输构建产物
rsync -az --delete \
  -e "ssh -p ${DEPLOY_PORT} -o StrictHostKeyChecking=yes" \
  "${BUILD_DIR%/}/" "${DEPLOY_USER}@${DEPLOY_HOST}:${REMOTE_RELEASE_DIR}/"

# 3) 原子切换 current
ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes "${DEPLOY_USER}@${DEPLOY_HOST}" "
  set -e
  ln -sfn '${REMOTE_RELEASE_DIR}' '${REMOTE_CURRENT_LINK}'
  echo 'Switched current -> ${REMOTE_RELEASE_DIR}'
"

# 4) 清理旧版本
ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes "${DEPLOY_USER}@${DEPLOY_HOST}" "
  set -e
  cd '${REMOTE_BASE_DIR%/}/releases'
  ls -1dt release-* 2>/dev/null | tail -n +$((KEEP_RELEASES+1)) | xargs -r rm -rf --
  echo 'Pruned to keep ${KEEP_RELEASES} releases'
"

echo "Deploy done."


