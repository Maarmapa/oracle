'use client';
import { useState } from 'react';
import { AvatarCall, AvatarVideo, ControlBar, useClientEvent } from '@runwayml/avatars-react';
import { TOOL_NAMES, SCENES, MOODS } from '@/lib/tools';

export default function OracleCall() {
  const [scene, setScene] = useState('berlin');
  const [mood, setMood] = useState('default');
  const [active, setActive] = useState(false);
  const currentScene = SCENES[scene];
  const currentMood = MOODS[mood];

  return (
    <div className="oracle-wrapper" style={{ '--accent': currentMood.accent, '--glow': currentMood.glow } as React.CSSProperties}>
      {currentScene.video ? (
        <video key={currentScene.video} className="oracle-bg-video" src={currentScene.video} autoPlay loop muted playsInline />
      ) : (
        <div className="oracle-bg" style={{ backgroundImage: `url(${currentScene.bg})` }} />
      )}
      <div className="oracle-overlay" style={{ background: currentScene.overlay }} />
      <div className="oracle-location"><span className="loc-dot" />{currentScene.label}</div>
      <div className="oracle-center">
        {!active ? (
          <>
            <div className="oracle-header">
              <p className="oracle-eyebrow">// entidad viva · maarmapa.eth</p>
              <h1 className="oracle-title">HIGH<br /><span className="oracle-title-accent">ORACLE</span></h1>
            </div>
            <button className="oracle-start-btn" onClick={() => setActive(true)}>consultar al oracle →</button>
          </>
        ) : (
          <AvatarCall avatarId="d1a78045-c103-4631-8602-92418bb04c2b" connectUrl="/api/avatar/session">
            <ToolHandlers onScene={setScene} onMood={setMood} />
            <div className="oracle-video-wrap"><AvatarVideo className="oracle-video" /></div>
            <ControlBar className="oracle-controls" />
          </AvatarCall>
        )}
      </div>
      <div className="oracle-scenes">
        {Object.entries(SCENES).map(([key]) => (
          <button key={key} className={`scene-btn ${scene === key ? 'active' : ''}`} onClick={() => setScene(key)}>{key}</button>
        ))}
      </div>
      <div className="oracle-powered">powered by <a href="https://runwayml.com" target="_blank" rel="noopener">Runway</a></div>
    </div>
  );
}

function ToolHandlers({ onScene, onMood }: { onScene: (s: string) => void; onMood: (m: string) => void }) {
  useClientEvent(TOOL_NAMES.CHANGE_SCENE, (args: { location: string }) => { if (args?.location) onScene(args.location); });
  useClientEvent(TOOL_NAMES.CHANGE_MOOD, (args: { mood: string }) => { if (args?.mood) onMood(args.mood); });
  return null;
}
