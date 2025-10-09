import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = {
  width: 64,
  height: 64
};
export const contentType = "image/png";

export default async function Icon() {
  const candidates = ["profile.webp", "profile.jpg", "DSC_0066.JPG"];
  let photoSrc: string | null = null;

  for (const filename of candidates) {
    const photoPath = path.join(process.cwd(), "public", filename);
    try {
      const buffer = await fs.promises.readFile(photoPath);
      const base64 = buffer.toString("base64");
      const ext = path.extname(filename).toLowerCase();
      const mime =
        ext === ".png"
          ? "png"
          : ext === ".webp"
            ? "webp"
            : ext === ".gif"
              ? "gif"
              : "jpeg";
      photoSrc = `data:image/${mime};base64,${base64}`;
      break;
    } catch {
      // ignore and try next candidate
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          borderRadius: "9999px",
          overflow: "hidden",
          padding: "4px"
        }}
      >
        {photoSrc ? (
          <img
            src={photoSrc}
            alt="Portrait de Sim Bienvenue Houlboumi"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "9999px"
            }}
          />
        ) : (
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#38bdf8",
              letterSpacing: "0.1em"
            }}
          >
            SB
          </span>
        )}
      </div>
    ),
    {
      width: size.width,
      height: size.height
    }
  );
}
