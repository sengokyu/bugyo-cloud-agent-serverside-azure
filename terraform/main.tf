locals {
  location            = "japaneast"
  function_source_dir = "${path.module}/../functions"
}

resource "random_uuid" "bca" {
  keepers = { timestamp = timestamp() }
}

## ZIPパッケージ
##
resource "archive_file" "bca" {
  type = "zip"
  # 一時ファイル作成
  output_path = "${path.module}/tmp-${random_uuid.bca.result}.zip"
  source_dir  = local.function_source_dir
  excludes = [
    ".?*",
    "*.md",
    "build.mjs",
    "local.settings.json",
    "node_modules",
    "package-lock.json",
    "src",
    "tsconfig.*",
  ]
}
