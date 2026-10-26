export async function saveProfileShareImage(card: HTMLElement, profileName: string): Promise<void> {
  await document.fonts.ready;
  await Promise.all(Array.from(card.querySelectorAll("img")).map(async (image) => {
    await image.decode();
    // 표시 가능한 외부 사진이라도 CORS가 없으면 PNG에 담을 수 없다.
    const response = await fetch(image.currentSrc || image.src, { mode: "cors" });
    if (!response.ok) throw new Error("프로필 사진을 저장할 수 없어요.");
  }));
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(card, {
    pixelRatio: 2,
    backgroundColor: "#F9F8FF",
    style: { boxShadow: "none" },
    preferredFontFormat: "woff2",
  });
  if (!blob) throw new Error("이미지를 만들지 못했어요. 다시 시도해 주세요.");

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `기웃-${profileName.replace(/[\\/:*?"<>|]/g, "_")}-프로필.png`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
