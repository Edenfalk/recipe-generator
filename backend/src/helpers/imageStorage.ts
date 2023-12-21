import axios from 'axios'
import { BlobServiceClient } from '@azure/storage-blob'

const blobServiceClient = BlobServiceClient.fromConnectionString(
	process.env.AZURE_STORAGE_CONNECTION_STRING as string
)

export const uploadImageAndGetUrl = async (
	imageUrl: string,
	recipeId: string
) => {
	const containerName = 'recipeblobimages'
	const containerClient = blobServiceClient.getContainerClient(containerName)
	const blobName = `recipe-${recipeId}.png`
	const blockBlobClient = containerClient.getBlockBlobClient(blobName)

	// Ladda ner bilden från OpenAI:s temporära URL
	const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
	const imageBuffer = response.data

	const blobOptions = { blobHTTPHeaders: { blobContentType: 'image/png' } }

	// Ladda upp bilden till Azure Blob Storage
	await blockBlobClient.upload(imageBuffer, imageBuffer.length, blobOptions)

	return blockBlobClient.url
}
