import '../../styles/globals.scss'

export const metadata = {
  title: '서비스 도입 FAQ | 위블 비즈(Wible Biz) - 친환경 모빌리티 서비스',
  description: '자주 묻는 질문',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
