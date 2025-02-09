# 奉行クラウドエージェント サーバーサイド Azure Function

- [functions](./functions/)
- [terraform](./terraform/)

## リソース作成

```console
cd terraform
terraform init
terraform apply
```

## デプロイ

```console
cd functions
echo azcopy_dest=$BLOB_CONTAINER_URL >> .npmrc
npm i
npm run azcopy
```
