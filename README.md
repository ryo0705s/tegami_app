# TEGAMI

![表紙](https://user-images.githubusercontent.com/76162690/144736161-b04347cc-418c-4afb-b7c5-2449443f8dc0.png)

## overview

TEGAMI は手紙を共有できるアプリです。

コロナ禍の中で、人と会う機会が減ったので、

人との繋がりを思い出させてくれるアプリを作成してみました。

### PC 版

|                認証                |             ユーザー登録             |
| :--------------------------------: | :----------------------------------: |
| ![認証](https://user-images.githubusercontent.com/76162690/144736189-ece8bce8-b0df-4d05-8ca3-eee48196fcbe.png) | ![ユーザー情報](https://user-images.githubusercontent.com/76162690/144736201-3829cbcc-fe68-4a0f-a859-0c41d300801e.png) |

|              投稿               |             みんなの投稿              |
| :-----------------------------: | :-----------------------------------: |
| ![新規投稿](https://user-images.githubusercontent.com/76162690/144736206-2865e9e7-d726-45bc-87d8-145ffded2a41.png) | ![みんなの投稿](https://user-images.githubusercontent.com/76162690/144736209-ea96cef7-6c66-4086-bfd9-c01c5b5496e1.png) |

|               いいね               |              コメント              |
| :--------------------------------: | :--------------------------------: |
| ![いいね](https://user-images.githubusercontent.com/76162690/144736216-fbc5ec94-23b7-4ba6-b4c0-ee2b2836a030.png) | ![コメント](https://user-images.githubusercontent.com/76162690/144736258-9ff45255-3456-4b19-b66b-861fda4b4726.png) |

### スマホ版

|                   認証                   |                みんなの投稿                 |
| :--------------------------------------: | :-----------------------------------------: |
| ![ログイン](https://user-images.githubusercontent.com/76162690/144736425-9993f4a9-72e6-4ae0-bf25-59d6ea241dbd.png) | ![みんなの投稿](https://user-images.githubusercontent.com/76162690/144736403-e36b191c-677a-4ca1-b5a6-acdf13e1cccd.png) |

## Demo

https://tegami-app-cq3t3iql4-ryo0705s.vercel.app/

## Installation/Usage

```
$ git clone https://github.com/ryo0705s/tegami_app.git
```

```
$ npm run dev
```

## Features

- 認証機能（mail、Google、ゲスト）
- 投稿機能
- コメント機能
- いいね機能
- crud 機能

## 実装予定機能

- 最近の投稿表示
- タイムスタンプ
- メッセージ機能
- オンライン文通機能

## Technology

- JavaScript Framework: React, Typescript, Next.js
- styling: Sass, Material-UI
- BaaS: Firebase
  - IDaaS: Firebase Authentication
  - Database: Cloud Firestore
  - Hosting: Firebase Hosting
  - FaaS: Cloud Functions
  - Storage: Cloud Storage

## Requirements

- Node.js

## Auther

### Ryo Sasaki

- [GitHub](https://github.com/ryo0705s)
- [twitter](https://twitter.com/DwmGlory)

### ディレクトリ構成

```
@
├─ firebase
├─ next
├─ build
├─ components // view
│   ├─ pageView // 各ページのview
│   ├─ scss
│   ├─ global.css
│   └─ layout.tsx
├─ context // 各ページで使用するstateを格納
├─ hooks  // カスタムフック
├─ node_modules
├─ pages　// 各ページ
│   ├─ auth // ログイン周り
│   ├─ posts // 投稿周り
│   │   ├─ [postsId]　// 投稿詳細
│   │   ├─ posting.tsx
│   │   └─ postLIsts.tsx
│   ├─ users　// ユーザーページ周り
│   ├─ _app.js
│   └─ index.tsx
├─ public
├─ .env
├─ .firebaserc
├─ .gitignore
├─ .firebase.json
├─ .firebase.ts
├─ .firestore.indexes.json
├─ .firestore.rules
├─ next-env.d.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.json
└─ yarn.lock
```

### Firebase
![firebase](https://user-images.githubusercontent.com/76162690/144736132-a62e8410-d612-4c0f-a401-b92114ccaa36.png)
