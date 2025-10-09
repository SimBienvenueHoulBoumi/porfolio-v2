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
  const photoPath = path.join(process.cwd(), "public/DSC_0066.JPG");
  const photoBuffer = await fs.promises.readFile(photoPath);
  const base64Photo = photoBuffer.toString("base64");
  const photoSrc = `data:image/jpeg;base64,${base64Photo}`;

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
        <img
          src={photoSrc}
          alt="Portrait de Sim Bienvenue Houlboumi"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "9999px",
            transform: "rotate(-90deg)"
          }}
        />
      </div>
    ),
    {
      width: size.width,
      height: size.height
    }
  );
}
