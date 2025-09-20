#!/usr/bin/env bash
set -euo pipefail

# 必填环境变量：
# SERVER_HOSTS (多个IP用|分割), DEPLOY_USER, DEPLOY_PORT, REMOTE_BASE_DIR, BUILD_DIR
# 可选：KEEP_RELEASES (默认 5)

KEEP_RELEASES="${KEEP_RELEASES:-5}"
RELEASE_NAME="release-$(date +%Y%m%d-%H%M%S)-${GITHUB_SHA:-manual}"

if [ -z "${SERVER_HOSTS:-}" ] || [ -z "${DEPLOY_USER:-}" ] || [ -z "${DEPLOY_PORT:-}" ] || [ -z "${REMOTE_BASE_DIR:-}" ] || [ -z "${BUILD_DIR:-}" ]; then
  echo "Missing required env vars. Need SERVER_HOSTS, DEPLOY_USER, DEPLOY_PORT, REMOTE_BASE_DIR, BUILD_DIR" >&2
  exit 1
fi

if [ ! -d "$BUILD_DIR" ]; then
  echo "BUILD_DIR '$BUILD_DIR' does not exist or is not a directory" >&2
  exit 1
fi

# 将SERVER_HOSTS按|分割成数组
IFS='|' read -ra HOSTS <<< "$SERVER_HOSTS"

if [ ${#HOSTS[@]} -eq 0 ]; then
  echo "No hosts found in SERVER_HOSTS" >&2
  exit 1
fi

echo "Starting deployment to ${#HOSTS[@]} server(s)..."
echo "Hosts: ${SERVER_HOSTS}"
echo "Release: ${RELEASE_NAME}"
echo ""

FAILED_HOSTS=()
SUCCESSFUL_HOSTS=()

# 部署到每个服务器的函数
deploy_to_host() {
  local HOST="$1"
  local REMOTE_RELEASE_DIR="${REMOTE_BASE_DIR%/}/releases/${RELEASE_NAME}"
  local REMOTE_CURRENT_LINK="${REMOTE_BASE_DIR%/}/current"
  
  echo "[${HOST}] Starting deployment..."
  echo "[${HOST}] Uploading build from ${BUILD_DIR} to ${DEPLOY_USER}@${HOST}:${REMOTE_RELEASE_DIR}"
  
  # 1) 确保远端目录存在
  echo "[${HOST}] Creating remote directory structure..."
  echo "[${HOST}] Debug: ssh -p ${DEPLOY_PORT} -o StrictHostKeyChecking=yes ${DEPLOY_USER}@${HOST}"
  echo "[${HOST}] Known hosts content:"
  grep "${HOST}" ~/.ssh/known_hosts || echo "[${HOST}] No known_hosts entry found!"
  
  if ! ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes "${DEPLOY_USER}@${HOST}" "mkdir -p '${REMOTE_RELEASE_DIR}'"; then
    echo "[${HOST}] Failed to create remote directory" >&2
    echo "[${HOST}] SSH debug info:"
    ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes -v "${DEPLOY_USER}@${HOST}" "echo 'test'" 2>&1 || true
    return 1
  fi
  
  # 2) 传输构建产物
  echo "[${HOST}] Syncing files..."
  if ! rsync -az --delete \
    -e "ssh -p ${DEPLOY_PORT} -o StrictHostKeyChecking=yes" \
    "${BUILD_DIR%/}/" "${DEPLOY_USER}@${HOST}:${REMOTE_RELEASE_DIR}/"; then
    echo "[${HOST}] Failed to sync files" >&2
    return 1
  fi
  
  # 3) 原子切换 current
  echo "[${HOST}] Switching to new release..."
  if ! ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes "${DEPLOY_USER}@${HOST}" "
    set -e
    ln -sfn '${REMOTE_RELEASE_DIR}' '${REMOTE_CURRENT_LINK}'
    echo '[${HOST}] Switched current -> ${REMOTE_RELEASE_DIR}'
  "; then
    echo "[${HOST}] Failed to switch to new release" >&2
    return 1
  fi
  
  # 4) 清理旧版本
  echo "[${HOST}] Cleaning up old releases (keeping ${KEEP_RELEASES})..."
  if ! ssh -p "${DEPLOY_PORT}" -o StrictHostKeyChecking=yes "${DEPLOY_USER}@${HOST}" "
    set -e
    cd '${REMOTE_BASE_DIR%/}/releases'
    ls -1dt release-* 2>/dev/null | tail -n +$((KEEP_RELEASES+1)) | xargs -r rm -rf --
    echo '[${HOST}] Pruned to keep ${KEEP_RELEASES} releases'
  "; then
    echo "[${HOST}] Warning: Failed to clean up old releases (non-critical)" >&2
  fi
  
  echo "[${HOST}] Deploy completed successfully!"
  return 0
}

# 并行部署到所有服务器
pids=()
for HOST in "${HOSTS[@]}"; do
  deploy_to_host "$HOST" &
  pids+=($!)
done

# 等待所有部署完成并收集结果
for i in "${!pids[@]}"; do
  pid=${pids[$i]}
  host=${HOSTS[$i]}
  
  if wait $pid; then
    SUCCESSFUL_HOSTS+=("$host")
  else
    FAILED_HOSTS+=("$host")
  fi
done

echo ""
echo "========================================="
echo "Deployment Summary:"
echo "========================================="
echo "Total servers: ${#HOSTS[@]}"
echo "Successful: ${#SUCCESSFUL_HOSTS[@]}"
echo "Failed: ${#FAILED_HOSTS[@]}"

if [ ${#SUCCESSFUL_HOSTS[@]} -gt 0 ]; then
  echo ""
  echo "✅ Successful deployments:"
  for host in "${SUCCESSFUL_HOSTS[@]}"; do
    echo "  - $host"
  done
fi

if [ ${#FAILED_HOSTS[@]} -gt 0 ]; then
  echo ""
  echo "❌ Failed deployments:"
  for host in "${FAILED_HOSTS[@]}"; do
    echo "  - $host"
  done
  echo ""
  echo "Deployment completed with errors!"
  exit 1
fi

echo ""
echo "🎉 All deployments completed successfully!"


