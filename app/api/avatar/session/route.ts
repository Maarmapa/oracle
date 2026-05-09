import RunwayML from '@runwayml/sdk';
import { tools } from '@/lib/tools';

const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });

// Your High Oracle avatar ID
const ORACLE_AVATAR_ID = 'd1a78045-c103-4631-8602-92418bb04c2b';

export async function POST() {
  try {
    const session = await client.realtimeSessions.create({
      model: 'gwm1_avatars',
      avatar: { type: 'custom', avatarId: ORACLE_AVATAR_ID },
      tools,
    });

    // Poll until ready
    let ready = session;
    for (let i = 0; i < 30; i++) {
      if (ready.status === 'READY') break;
      await new Promise(r => setTimeout(r, 1000));
      ready = await client.realtimeSessions.retrieve(session.id);
    }

    if (ready.status !== 'READY') {
      return Response.json({ error: 'Session timeout' }, { status: 504 });
    }

    return Response.json({
      sessionId: ready.id,
      url: ready.url,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
