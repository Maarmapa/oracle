'use client';

import { useState, useCallback } from 'react';
import { AvatarCall, AvatarVideo, ControlBar, useClientEvent } from '@runwayml/avatars-react';
import { changeSceneTool, changeMoodTool, SCENES, MOODS } from '@/lib/tools';

export default function OracleCall() {
  const [scene, setScene] = useState('berlin');
  const [mood, setMood] = useState('default');
  const [active, setActive] = useState(false);

  const handleSceneChange = useCallback(({ location }: { location: string }) => {
    setScene(location);
  }, []);

  const handleMoodChange = useCallback(({ mood: m }: { mood: string }) => {
    setMood(m);
  }, []);

  const currentScene = SCENES[scene];
  const currentMood = MOODS[mood];

  return (
    <div className="oracle-wrapper" style={{
      '--accent': currentMood.accent,
      '--glow': currentMood.glow,
    } as React.CSSProperties}>

      {/* Background */}
      <div
        className="oracle-bg"
        style={{ backgroundImage: `url(${currentScene.bg})` }}
      />
      <div className="oracle-overlay" style={{ background: currentScene.overlay }} />

      {/* Location label */}
      <div className="oracle-location">
        <span className="loc-dot" />
        {currentScene.label}
      </div>

      {/* Main Oracle UI */}
      <div className="oracle-center">
        <div className="oracle-header">
          <p className="oracle-eyebrow">// entidad viva · maarmapa.eth</p>
          <h1 className="oracle-title">HIGH<br /><span className="oracle-title-accent">ORACLE</span></h1>
        </div>

        {!active ? (
          <button
            className="oracle-start-btn"
            onClick={() => setActive(true)}
          >
            consultar al oracle →
          </button>
        ) : (
          <AvatarCall
            avatarId="d1a78045-c103-4631-8602-92418bb04c2b"
            connectUrl="/api/avatar/session"
          >
            <SceneHandler onScene={handleSceneChange} onMood={handleMoodChange} />
            <div className="oracle-video-wrap">
              <AvatarVideo className="oracle-video" />
            </div>
            <ControlBar className="oracle-controls" />
          </AvatarCall>
        )}
      </div>

      {/* Scene selector */}
      <div className="oracle-scenes">
        {Object.entries(SCENES).map(([key, val]) => (
          <button
            key={key}
            className={`scene-btn ${scene === key ? 'active' : ''}`}
            onClick={() => setScene(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Powered by */}
      <div className="oracle-powered">
        powered by <a href="https://runwayml.com" target="_blank" rel="noopener">Runway</a>
      </div>
    </div>
  );
}

// Separate component to use hooks inside AvatarCall
function SceneHandler({
  onScene,
  onMood,
}: {
  onScene: (args: { location: string }) => void;
  onMood: (args: { mood: string }) => void;
}) {
  useClientEvent(changeSceneTool, onScene);
  useClientEvent(changeMoodTool, onMood);
  return null;
}
