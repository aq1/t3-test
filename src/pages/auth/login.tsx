import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { getCsrfToken, getSession } from "next-auth/react"
import * as Form from "@radix-ui/react-form"
import Layout from "~/pages/auth/layout"
import Input from "~/components/input"
import Button from "~/components/button"

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="h-full w-full">
        <Form.Root
          action="/api/auth/signin/email"
          method="post"
          className="flex flex-col gap-5"
        >
          <Form.Field className="flex flex-col gap-2" name="email">
            <div className="m-0 min-h-[25px] p-0">
              <Form.Message
                className="text-xs text-white opacity-80"
                match="valueMissing"
              >
                Please enter your email
              </Form.Message>
              <Form.Message
                className="text-xs text-white opacity-80"
                match="typeMismatch"
              >
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <Input placeholder="Email" type="email" required />
            </Form.Control>
          </Form.Field>

          <input type="hidden" value={csrfToken} name="csrfToken" />
          <Form.Submit asChild>
            <div className="flex w-full justify-center">
              <div className="w-fit">
                <Button>Sign In</Button>
              </div>
            </div>
          </Form.Submit>
        </Form.Root>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
