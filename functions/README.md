# Azure Functions

## Function 一覧

- [BugyoCloudAgent - 奉行クラウドクライアント タイムカードパンチ](./README.BugyoCloudAgent.md)

## Running dev server

```bash
npm run start
```

## Deploying

```bash
# Switch Azure account
az account set -s "MY SUBSCRIPTION"
# Set configuration option
echo function_name="MY AZURE FUNCTION RESOURCE NAME" >> .npmrc
```

```bash
# Publish to Azure
npm run publish
```


