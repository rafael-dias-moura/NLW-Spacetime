import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { extname, resolve } from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
    app.post('/upload', async (request, reply) => {
        const upload = await request.file({
            limits: {
                fileSize: 5242880, //5mb
            },
        })

        if (!upload) {
            return reply.status(400).send()
        }

        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

        if (!isValidFileFormat) {
            return reply.status(400).send()
        }

        const fileId = randomUUID()//vem do próprio node
        const extension = extname(upload.filename)//vem do node tb

        const fileName = fileId.concat(extension)

        const writeStream = createWriteStream(
            resolve(__dirname, '../../uploads/', fileName),
        )

        await pump(upload.file, writeStream)

        const fullUrl = request.protocol.concat('://').concat(request.hostname)
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()
    
        return {
            fileUrl
        }
    })
}