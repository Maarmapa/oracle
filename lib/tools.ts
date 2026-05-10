export const TOOL_NAMES = {
  CHANGE_SCENE: 'change_scene',
  CHANGE_MOOD: 'change_mood',
} as const;

export const tools = [
  {
    type: 'client' as const,
    name: TOOL_NAMES.CHANGE_SCENE,
    description: "Change the Oracle's background location. Available: berlin, tokyo, rio, dubai, nyc, everest",
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string', enum: ['berlin', 'tokyo', 'rio', 'dubai', 'nyc', 'everest'] },
      },
      required: ['location'],
    },
  },
  {
    type: 'client' as const,
    name: TOOL_NAMES.CHANGE_MOOD,
    description: "Shift the Oracle's visual mood. Available: default, prophecy, warning, transcendent",
    parameters: {
      type: 'object',
      properties: {
        mood: { type: 'string', enum: ['default', 'prophecy', 'warning', 'transcendent'] },
      },
      required: ['mood'],
    },
  },
];

export const SCENES: Record<string, { label: string; bg: string; video?: string; overlay: string }> = {
  berlin:  { label: 'Berlin — Fernsehturm', video: 'https://pub-07910030472648618f97bdbf5bdbca01.r2.dev/WhatsApp%20Video%202026-05-10%20at%2010.52.16%20AM.mp4', bg: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&q=80', overlay: 'rgba(10,10,10,0.45)' },
  tokyo:   { label: 'Tokyo — Tokyo Tower', bg: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  rio:     { label: 'Rio — Cristo Redentor', bg: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  everest: { label: 'Everest — Base Camp', bg: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&q=80', overlay: 'rgba(10,10,10,0.6)' },
  dubai:   { label: 'Dubai — Burj Khalifa', bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f88

cat >> /workspaces/oracle/app/globals.css << 'EOF'

/* Video background */
.oracle-bg-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  filter: brightness(0.6) saturate(0.8);
  z-index: 0;
}

.oracle-video-wrap {
  width: min(360px, 75vw);
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent);
  box-shadow: 0 0 60px var(--glow);
  margin: 0 auto;
}

.oracle-video {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
}
