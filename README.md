# DPOPz frontend

DPOPz(Double Play Optionz) 프론트 

Next.js 16 + Tailwind 4 + TypeScript , Vercel 배포


## 로컬 개발

```bash
npm install
npm run dev
```

## Vercel 배포

1. Vercel에 Import (Framework: Next.js)
2. 환경변수 `API_ORIGIN=https://<백엔드 도메인>` (HTTPS 필수)

## 구조

```
app/            페이지
components/     화면 컴포넌트
lib/            API 클라이언트·타입, 조회 훅, 옵션 색상, 다국어 문구
```
