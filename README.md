# 奉行クラウドエージェント サーバーサイド Azure Function

- [functions](./functions/)
- [terraform](./terraform/)

## デプロイ

package.zip を作成

```console
cd functions
npm run zip
```

リソース作成

```console
cd terraform
terraform init
terraform apply
```
