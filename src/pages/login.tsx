import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { getCsrfToken, getSession } from "next-auth/react"
import * as Form from "@radix-ui/react-form"

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="grid h-screen w-screen place-items-center overflow-hidden">
      <Form.Root action="/api/auth/signin/email" method="post">
        <input type="hidden" value={csrfToken} name="csrfToken" />
        <Form.Field className="mb-[10px] grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Email
            </Form.Label>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your email
            </Form.Message>
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-black px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-black outline-none selection:bg-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <div className="flex w-full justify-center">
            <button className="">Sign In</button>
          </div>
        </Form.Submit>
      </Form.Root>
    </div>
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
