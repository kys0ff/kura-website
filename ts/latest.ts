async function updateDownloadLink() {
  const owner = "kys0ff";
  const repo = "Kura";
  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });

    if (!response.ok) return;

    const data = await response.json();

    const apkAsset = data.assets.find((asset: any) => asset.name.endsWith('.apk'));
    const downloadBtn = document.querySelector('.download-button') as HTMLAnchorElement;

    if (downloadBtn && apkAsset) {
      downloadBtn.href = apkAsset.browser_download_url;
      downloadBtn.innerText = `Download ${data.tag_name}`;
    }
  } catch (error) {
    console.error("Error updating download link:", error);
  }
}

window.addEventListener('DOMContentLoaded', updateDownloadLink);
