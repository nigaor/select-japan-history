# 1. ベースイメージの指定
FROM node:20-alpine

# 2. 作業ディレクトリの作成と指定
WORKDIR /app

# 3. 依存関係のインストール
COPY package*.json ./
RUN npm install

# 4. ソースコードのコピー
COPY . .

# 5. Next.jsが使用するポートを公開
EXPOSE 3000

# 6. 開発サーバーの起動コマンド
CMD ["npm", "run", "dev"]