import { S } from "./SkeletonBar.styles";

type SkeletonBarProps = {
  delay?: number;
  height?: string;
  width?: string;
};

export function SkeletonBar({
  delay = 0,
  height = "7px",
  width = "100%",
}: SkeletonBarProps) {
  return (
    <S.Bar
      $delay={delay}
      $height={height}
      $width={width}
      aria-hidden="true"
    />
  );
}
