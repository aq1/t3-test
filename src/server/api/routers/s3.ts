import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { z } from "zod"
import { nanoid } from "nanoid"
import { env } from "~/env.mjs"

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: `https://${env.AWS_REGION}.digitaloceanspaces.com`,
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

const s3Router = createTRPCRouter({
  getUploadUrl: protectedProcedure
    .input(z.object({ key: z.string().min(1), contentType: z.string().min(1) }))
    .query(async ({ input }) => {
      const key = `${nanoid()}.${input.key.split(".").at(-1)}`
      const expiresIn = 5 * 60

      const url = (await getSignedUrl(
        s3Client,
        new PutObjectCommand({
          Bucket: env.AWS_STORAGE_BUCKET_NAME,
          Key: key,
          ContentType: input.contentType,
        }),
        { expiresIn }
      ))

      return {
        url,
        expiresIn,
      }
    }),
})

export default s3Router
