import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Retry</title>
        <meta name="description" content="Retry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen">
        <div className="flex h-full w-full justify-center gap-5 text-gray-100">
          <div className="flex-grow-0 basis-1/4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae,
            commodi dicta dolorum exercitationem impedit nihil nobis
            reprehenderit! Consectetur distinctio eum exercitationem hic natus
            non, numquam repellendus sunt, suscipit, ut veniam!
          </div>
          <div className="basis-1/2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
            error facere fugiat molestiae neque provident quidem sit voluptatum.
            Cupiditate dignissimos, eligendi enim eum explicabo fugiat iure
            laboriosam reiciendis similique soluta.
          </div>
          <div className="flex-grow-0 basis-1/4"></div>
        </div>
      </main>
    </>
  )
}
