import Image, { type ImageProps } from "next/image";
import { resolveImageSrc } from "@/lib/image-resolve";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

export function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const resolved = resolveImageSrc(src ?? undefined);
  const unoptimized =
    props.unoptimized ??
    (typeof src === "string" && src.startsWith("/api/uploads/"));

  return <Image src={resolved} alt={alt} unoptimized={unoptimized} {...props} />;
}
