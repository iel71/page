This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```bash
전체적으로 기존 페이지와 동일하게 만들었습니다.

다만 몇 가지 수정 한 부분은,
기존에는 검색 후에만 보여졌던 검색결과 총 10건 같은 경우,
사용자들이에게 해당 탭에 총 리스트가 몇 개인지 알려주는 것이 좋을 것 같아
총 10건 값을 항상 보여 주도록 해 주었고,
검색 아이콘인 돋보기를 마우스 호버 했을 때, 살짝 Scale이 커지도록 주어서 버튼 느낌이 나도록 했습니다.

그리고 기존에 검색 후 엔터를 치면, API 호출이 두 번 되는 현상을 1번 호출 되도록 수정하였습니다.

UI가 처음 과제를 받았을 때랑 미세하게 달라졌습니다.
로고나, 자주 묻는 질문이 왼쪽으로 정렬이 되고, 민트 포인트 색상이 제거 되었는데,
로고는 기아 비즈로 수정을 하였고, 자주 묻는 질문 텍스트는 중앙 정렬로 두고 민트 포인트도 살려 두었습니다.
이용 프로세스 안내 아이콘 이미지들도 기존것으로 유지했습니다.

문의가 있으시면 언제든지 연락 바랍니다.
감사합니다.
```
