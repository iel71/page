import MswProvider from '@/components/mswProvider'
import '../../styles/globals.scss'

export const metadata = {
  title: '서비스 도입 FAQ | 위블 비즈(Wible Biz) - 친환경 모빌리티 서비스',
  description:
    '위블 비즈 서비스 도입 FAQ를 통해 차량 구독 패키지, 솔루션 구독 패키지 및 하이브리드 패키지 도입 방법을 자세하게 알아보세요',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MswProvider> {children}</MswProvider>
      </body>
    </html>
  )
}
