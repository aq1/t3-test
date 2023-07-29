import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { api } from "~/utils/api"
import "~/styles/globals.css"
import "remixicon/fonts/remixicon.css"

const RetryApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="h-full w-full bg-gray-500">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default api.withTRPC(RetryApp)
