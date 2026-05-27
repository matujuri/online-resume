# online-resume（李静静のポートフォリオ）

## 概要

- **目的**: 自己紹介・退職後の制作物・連絡先を静的 HTML で公開する個人ポートフォリオサイト。
- **主要技術**: HTML5、Bootstrap 5.3、カスタム CSS（`assets/css/style.css`）、バニラ JS（言語切替・画像モーダル、`assets/js/i18n.js`）。

## ディレクトリ構成

| パス | 責務 |
|------|------|
| `index.html` | トップ（ヘッダー、紹介、制作物ショーケース、About、連絡先） |
| `assets/css/style.css` | レイアウト・テーマ・レスポンシブ |
| `assets/js/i18n.js` | `localStorage` と `data-i18n` / `data-ja` / `data-en` による日英切替 |
| `assets/images/projects/` | 制作物サムネイル・アイコン |
| `assets/images/profile/` | プロフィール・背景画像 |
| `assets/images/cats/` | ヘッダー用猫画像 |

## コア設計

- **状態管理**: 表示言語は `localStorage` の `language` キー（`assets/js/i18n.js`）。初期値はブラウザ言語。
- **データフロー**: ページ読込 → `DOMContentLoaded` で `getLanguage()` → `updatePageLanguage()` が `[data-i18n]` 要素の `data-ja` / `data-en` を反映。画像 alt は `[data-alt-ja][data-alt-en]` を同様に更新。
- **重要なルール**: 新しい多言語テキストは要素に `data-i18n`（一意キー）と `data-ja` / `data-en` を付与する。ショーケースの画像は既存パターンに合わせる（外部リンクは `<a target="_blank" rel="noopener noreferrer">`）。

## 変更時の注意

- **制作物を増やす場合**: `index.html` の `#showcase` 内グリッド（`row-cols-lg-3`）と、`assets/images/projects/` の画像パスを揃える。英語切替が必要なら `data-i18n` を忘れない。
- **スタイル**: セクション見出し・カードまわりは `#showcase` など既存セレクタと競合しないよう `style.css` を確認してから追加する。
