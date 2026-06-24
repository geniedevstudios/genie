import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  // Read the local file from public directory
  const imageBuffer = readFileSync(join(process.cwd(), 'public/genie-logo.png'));
  const imageData = imageBuffer.toString('base64');
  const src = `data:image/png;base64,${imageData}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#080a14', // Very dark blue/black to match the app theme
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={src} alt="Genie Logo" style={{ width: 135, height: 135 }} />
      </div>
    ),
    { ...size }
  );
}
