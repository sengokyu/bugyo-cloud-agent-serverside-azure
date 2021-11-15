# BugyoCloudAgent - 奉行クラウドクライアント タイムカードパンチ

POST HTTP トリガです。

## POST BODY 内容

```ts
interface queueItem {
  tenantCode: string;
  username: string;
  password: string;
  clockType: ClockType;
}
```

## テスト実行用データ

以下のようなファイルを用意します。

```json
{
  "tenantCode": "テナントコード",
  "username": "OBC ID",
  "password": "パスワード",
  "clockType": "ClockOut"
}
```

## テスト実行

呼び出します。

```bash
curl -X POST -d @test-data.json http://localhost:7071/api/BugyoCloudAgent
```
