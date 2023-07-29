import Head from "next/head"
import { signOut, useSession } from "next-auth/react"
import Button from "~/components/button"
import Link from "next/link"

export default function Home() {
  const { data } = useSession()
  return (
    <>
      <Head>
        <title>Retry</title>
        <meta name="description" content="Retry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen">
        <div className="flex h-full w-full justify-center gap-5 text-gray-100">
          <div className="flex-grow-0 basis-1/4"></div>
          <div className="h-fit w-fit pt-10">
            {data ? (
              <Button
                onClick={() => {
                  signOut().catch(() => {})
                }}
              >
                Sign Out
              </Button>
            ) : (
              <span>
                Hey, go{" "}
                <Link className="text-green-500" href="/auth/signin">
                  sign in
                </Link>
              </span>
            )}
          </div>
          <div className="flex-grow-0 basis-1/4"></div>
        </div>
      </main>
    </>
  )
}
