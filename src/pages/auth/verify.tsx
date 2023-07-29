import Layout from "~/pages/auth/layout"

export default function Error() {
  return (
    <Layout>
      <div className="h-full w-full rounded-xl border border-gray-300 bg-gray-400 p-20 text-center text-xl text-gray-100">
        <span>
          Please check your mail for a magic link.
          <br />
          You can close this page
        </span>
      </div>
    </Layout>
  )
}
