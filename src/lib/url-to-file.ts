async function urlToFile(url: string, filename: string, mimeType: string) {
  // Fetch the image data from the URL
  const response = await fetch(url);

  // Convert the response into a blob
  const blob = await response.blob();

  // Create a File object from the blob
  const file = new File([blob], filename, { type: mimeType });

  return file;
}

export default urlToFile;
