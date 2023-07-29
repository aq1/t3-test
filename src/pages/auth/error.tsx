import Layout from "~/pages/auth/layout"

export default function Error() {
  return (
    <Layout>
      <div className="h-full w-full">
        <div>error</div>
      </div>
    </Layout>
  )
}
//
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     }
//   }
//
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   }
// }
