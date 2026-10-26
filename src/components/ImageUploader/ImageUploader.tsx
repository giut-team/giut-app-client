import { useRef, useState, useEffect, type ChangeEvent } from "react";
import { S } from "./ImageUploader.styles";

const MAX_IMAGES = 10;

interface ImageItem {
  id: string;
  file: File;
  url: string;
}

interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
  maxImages?: number;
  maxMsg?: string; 
}

export default function ImageUploader({ onChange, maxImages=MAX_IMAGES, maxMsg, }: ImageUploaderProps) {
  const limitMsg = maxMsg ?? `사진은 최대 ${maxImages}장까지 추가할 수 있어요`;
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const [images, setImages] = useState<ImageItem[]>([]);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
      clearTimeout(toastTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  const update = (next: ImageItem[]) => {
    setImages(next);
    onChange?.(next.map((i) => i.file));
  };

  const handleAddClick = () => {
    if (images.length >= maxImages) {
      showToast(limitMsg);
      return;
    }
    inputRef.current?.click();
  };

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";

    const remain = maxImages - images.length;
    if (files.length > remain) showToast(limitMsg);

    const added: ImageItem[] = files.slice(0, remain).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      file,
      url: URL.createObjectURL(file),
    }));
    update([...images, ...added]);
  };

  const handleRemove = (id: string) => {
    const target = images.find((i) => i.id === id);
    if (target) URL.revokeObjectURL(target.url);
    update(images.filter((i) => i.id !== id));
  };

  return (
    <S.Wrap>
      <S.AddButton type="button" onClick={handleAddClick}>
        <S.Plus>+</S.Plus>
        <S.Count>
          {images.length} / {maxImages}
        </S.Count>
      </S.AddButton>

      <S.HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />

      <S.Scroll>
        {images.map((img, idx) => (
          <S.Item key={img.id}>
            <S.Img src={img.url} alt={`업로드 ${idx + 1}`} />
            {idx === 0 && <S.CoverBadge>커버</S.CoverBadge>}
            <S.RemoveButton
              type="button"
              aria-label="사진 삭제"
              onClick={() => handleRemove(img.id)}
            />
          </S.Item>
        ))}
      </S.Scroll>

      {toast && <S.Toast>{toast}</S.Toast>}
    </S.Wrap>
  );
}