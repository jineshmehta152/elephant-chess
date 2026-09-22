export async function uploadToCloudinary(file: File) {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("upload_preset", "unsigned_gallery")
  formData.append("folder", "gallery")

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
    {
      method: "POST",
      body: formData,
    }
  )

  if (!res.ok) throw new Error("Upload failed")

  const data = await res.json()
  return data.secure_url
}
