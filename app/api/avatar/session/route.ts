import RunwayML from '@runwayml/sdk';

const client = new RunwayML();
const ORACLE_AVATAR_ID = 'd1a78045-c103-4631-8602-92418bb04c2b';

export async function POST() {
  try {
    const { id: sessionId } = await (client.realtimeSessions.create as any)({
      model: 'gwm1_avatars',
      avatar: { type: 'custom', avatarId: ORACLE_AVATAR_ID },
    });

    let sessionKey: string | undefined;
    for (let i = 0; i < 60; i++) {
      const session = await client.realtimeSessions.retrieve(sessionId);
      if (session.status === 'READY') { sessionKey = (session as any).sessionKey; break; }
      if (session.status === 'FAILED') return Response.json({ error: 'Session failed' }, { status: 500 });
      await new Promise(r => setTimeout(r, 1000));
    }

    if (!sessionKey) return Response.json({ error: 'Timeout' }, { status: 504 });

    const consumeRes = await fetch(
      `https://api.dev.runwayml.com/v1/realtime_sessions/${sessionId}/consume`,
      { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionKey}`, 'X-Runway-Version': '2024-11-06' } }
    );

    const credentials = await consumeRes.json();
    console.log('credentials:', JSON.stringify(credentials));

    return Response.json(credentials);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
