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
  berlin:  { label: 'Berlin — Fernsehturm', video: 'https://pub-07910030472648618f97bdbf5bddca01.r2.dev/WhatsApp%20Video%202026-05-10%20at%2010.52.16%20AM.mp4', bg: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&q=80', overlay: 'rgba(10,10,10,0.45)' },
  tokyo:   { label: 'Tokyo — Tokyo Tower', video: 'https://pub-07910030472648618f97bdbf5bddca01.r2.dev/WhatsApp%20Video%202026-05-10%20at%207.04.13%20PM.mp4', bg: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80', overlay: 'rgba(10,10,10,0.45)' },
  rio:     { label: 'Rio — Cristo Redentor', bg: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  everest: { label: 'Everest — Base Camp', video: 'https://pub-07910030472648618f97bdbf5bddca01.r2.dev/WhatsApp%20Video%202026-05-10%20at%207.00.02%20PM.mp4', bg: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&q=80', overlay: 'rgba(10,10,10,0.45)' },
  dubai:   { label: 'Dubai — Burj Khalifa', video: 'https://pub-07910030472648618f97bdbf5bddca01.r2.dev/WhatsApp%20Video%202026-05-10%20at%207.00.01%20PM.mp4', bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80', overlay: 'rgba(10,10,10,0.45)' },
  nyc:     { label: 'New York — Empire State', video: 'https://pub-07910030472648618f97bdbf5bddca01.r2.dev/WhatsApp%20Video%202026-05-10%20at%206.59.59%20PM.mp4', bg: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1600&q=80', overlay: 'rgba(10,10,10,0.45)' },
};

export const MOODS: Record<string, { accent: string; glow: string }> = {
  default:      { accent: '#FF0080', glow: 'rgba(255,0,128,0.3)' },
  prophecy:     { accent: '#FFD700', glow: 'rgba(255,215,0,0.3)' },
  warning:      { accent: '#FF3300', glow: 'rgba(255,51,0,0.3)' },
  transcendent: { accent: '#00FFFF', glow: 'rgba(0,255,255,0.3)' },
};
