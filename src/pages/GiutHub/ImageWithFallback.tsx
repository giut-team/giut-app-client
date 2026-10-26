import { useState } from "react";
import { Icon } from "../../components/icons";
import { S } from "./ImageWithFallback.styles";

export function ImageWithFallback({ src, alt }: { src?: string | null; alt: string }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = src?.trim();

  if (!source || source === failedSource) {
    return (
      <S.Fallback role="img" aria-label={`${alt} 없음`}>
        <Icon name="image" size={22} weight="regular" aria-hidden="true" />
        <span aria-hidden="true">사진 없음</span>
      </S.Fallback>
    );
  }

  return <img src={source} alt={alt} onError={() => setFailedSource(source)} />;
}
