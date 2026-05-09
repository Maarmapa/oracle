import { clientTool, type ClientEventsFrom } from '@runwayml/avatars-react/api';
import { z } from 'zod';

export const changeSceneTool = clientTool('change_scene', {
  description: `Change the Oracle's background to a different location at height. 
  Available: berlin, tokyo, santiago, everest, dubai, nyc`,
  schema: z.object({
    location: z.enum(['berlin', 'tokyo', 'santiago', 'everest', 'dubai', 'nyc']),
  })['~standard'],
});

export const changeMoodTool = clientTool('change_mood', {
  description: `Shift the Oracle's visual mood. Available: default, prophecy, warning, transcendent`,
  schema: z.object({
    mood: z.enum(['default', 'prophecy', 'warning', 'transcendent']),
  })['~standard'],
});

export const tools = [changeSceneTool, changeMoodTool];
export type AppEvents = ClientEventsFrom<typeof tools>;

export const SCENES: Record<string, { label: string; bg: string; overlay: string }> = {
  berlin:   { label: 'Berlin — Torre de TV', bg: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  tokyo:    { label: 'Tokyo — Tokyo Tower', bg: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  santiago: { label: 'Santiago — Cerro San Cristóbal', bg: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  everest:  { label: 'Everest — Base Camp', bg: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&q=80', overlay: 'rgba(10,10,10,0.6)' },
  dubai:    { label: 'Dubai — Burj Khalifa', bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
  nyc:      { label: 'New York — Empire State', bg: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1600&q=80', overlay: 'rgba(10,10,10,0.55)' },
};

export const MOODS: Record<string, { accent: string; glow: string }> = {
  default:      { accent: '#FF0080', glow: 'rgba(255,0,128,0.3)' },
  prophecy:     { accent: '#FFD700', glow: 'rgba(255,215,0,0.3)' },
  warning:      { accent: '#FF3300', glow: 'rgba(255,51,0,0.3)' },
  transcendent: { accent: '#00FFFF', glow: 'rgba(0,255,255,0.3)' },
};
