# Cloudflare で Next.js

Next.js アプリケーションを Cloudflare Workers にデプロイするサンプル。  
データベースには Cloudflare D1 を使用。

→ 結果：デプロイできるがうまくいかない。Prisma と D1 の相性が悪そう（[関連 issue](https://github.com/prisma/prisma/issues/28657)）

## 技術スタック

- **Framework**: Next.js 15.5.9
- **Deployment**: Cloudflare Workers (`@opennextjs/cloudflare`)
- **Database**: Cloudflare D1
- **ORM**: Prisma 7.2.0
- **UI**: Tailwind CSS, Radix UI

## ローカル開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Prisma Client の生成

```bash
npm run db:generate
```

### 3. ローカル D1 データベースの初期化

初回のみ、ローカル D1 データベースにスキーマを適用します：

```bash
npm run db:init-local
```

データベースをリセットする場合：

```bash
npm run db:reset-local
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

ローカル開発環境では、Cloudflare の D1 Local を使用します（`.wrangler/state/v3/d1` 配下にデータが保存されます）。

## デプロイ

### 1. Cloudflare D1 データベースの作成（初回のみ）

```bash
npx wrangler d1 create todo-app-db
```

作成された database_id を `wrangler.jsonc` の `d1_databases` セクションに設定します。

### 2. 本番データベースへのスキーマ適用（初回のみ）

```bash
npx wrangler d1 execute todo-app-db --remote --file=./prisma/d1-schema.sql
```

### 3. デプロイ

```bash
npm run deploy
```

## データベース管理

### スキーマ変更時

1. `prisma/schema.prisma` を編集
2. Prisma Client を再生成: `npm run db:generate`
3. D1 スキーマファイルを更新: `prisma/d1-schema.sql` を手動で編集
4. ローカル: `npm run db:reset-local`
5. 本番: `npx wrangler d1 execute todo-app-db --remote --file=./prisma/d1-schema.sql`

## 参考リンク

- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Cloudflare D1 docs](https://developers.cloudflare.com/d1/get-started/)
- [Query D1 using Prisma ORM](https://developers.cloudflare.com/d1/tutorials/d1-and-prisma-orm/)
