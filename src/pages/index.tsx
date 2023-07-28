import Head from "next/head"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: sessionData } = useSession()
  return (
    <>
      <Head>
        <title>Retry</title>
        <meta name="description" content="Retry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-white ">
          <h1>hi</h1>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </main>
    </>
  )
}
