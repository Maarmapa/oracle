import RunwayML from '@runwayml/sdk';
import { tools } from '@/lib/tools';

const client = new RunwayML();
const ORACLE_AVATAR_ID = 'd1a78045-c103-4631-8602-92418bb04c2b';

export async function POST(request: Request) {
  try {
    const { id: sessionId } = await client.realtimeSessions.create({
      model: 'gwm1_avatars',
      avatar: { type: 'custom', avatarId: ORACLE_AVATAR_ID },
      tools,
    });

    let sessionKey: string | undefined;
    for (let i = 0; i < 60; i++) {
      const session = await client.realtimeSessions.retrieve(sessionId);
      if (session.status === 'READY') {
        sessionKey = session.sessionKey;
        break;
      }
      if (session.status === 'FAILED') {
        return Response.json({ error: 'Session failed' }, { status: 500 });
      }
      await new Promise(r => setTimeout(r, 1000));
    }

    if (!sessionKey) {
      return Response.json({ error: 'Session timed out' }, { status: 504 });
    }

    const consumeResponse = await fetch(
      `${client.baseURL}/v1/realtime_sessions/${sessionId}/consume`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionKey}`,
          'X-Runway-Version': '2024-11-06',
        },
      }
    );
    const credentials = await consumeResponse.json();

    return Response.json({
      sessionId,
      serverUrl: credentials.url,
      token: credentials.token,
      roomName: credentials.roomName,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}