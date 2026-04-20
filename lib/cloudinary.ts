import crypto from 'node:crypto';

export type CloudinaryUploadResult = {
  imageUrl: string;
  publicId: string;
};

type CloudinarySuccessResponse = {
  secure_url: string;
  public_id: string;
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.');
  }

  return { cloudName, apiKey, apiSecret };
}

function signUploadParams(params: Record<string, string>, apiSecret: string) {
  const serializedParams = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${serializedParams}${apiSecret}`).digest('hex');
}

export async function uploadPreviewBuffer(input: {
  projectId: string;
  buffer: Buffer;
  correlationId: string;
  capturedAt: string;
}): Promise<CloudinaryUploadResult> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1_000);
  const safeProjectId = input.projectId.replace(/[^a-zA-Z0-9_-]/g, '-');
  const publicId = `portfolio-previews/${safeProjectId}/${Date.now()}`;

  const signedParams = {
    folder: `portfolio-previews/${safeProjectId}`,
    public_id: publicId,
    timestamp: String(timestamp),
    context: `correlation_id=${input.correlationId}|captured_at=${input.capturedAt}`,
    overwrite: 'true',
    resource_type: 'image',
  };

  const signature = signUploadParams(signedParams, apiSecret);
  const form = new FormData();
  form.append('file', new Blob([new Uint8Array(input.buffer)], { type: 'image/png' }), `${safeProjectId}.png`);
  form.append('api_key', apiKey);
  form.append('timestamp', String(timestamp));
  form.append('signature', signature);
  form.append('folder', signedParams.folder);
  form.append('public_id', signedParams.public_id);
  form.append('context', signedParams.context);
  form.append('overwrite', signedParams.overwrite);
  form.append('resource_type', signedParams.resource_type);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as Partial<CloudinarySuccessResponse>;
  if (!payload.secure_url || !payload.public_id) {
    throw new Error('Cloudinary upload failed: missing secure_url or public_id');
  }

  return {
    imageUrl: payload.secure_url,
    publicId: payload.public_id,
  };
}
