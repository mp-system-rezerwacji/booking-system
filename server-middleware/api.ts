import express from 'express';
import admin from 'firebase-admin';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore';

const app = express();
app.use(express.json());

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
    }),
  });
}

const auth = getAuth();
const firestore = getFirestore();

declare global {
  namespace Express {
    interface Response {
      userToken: DecodedIdToken;
    }
  }
}


const checkAuth: express.RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    res.userToken = await auth.verifyIdToken(token || '');
    next();
  } catch (err) {
    res.status(401).send('unauthorized');
  }
};

const checkAdmin: express.RequestHandler = (req, res, next) => {
  if (!res.userToken?.admin) {
    res.status(403).send('forbidden');
    return;
  }

  next();
};

app.post('/invite', checkAuth, checkAdmin, async (req, res) => {
  const { email } = req.body;
  const ref = firestore.collection('invites').doc();
  await ref.set({
    email,
  });
  res.json({ inviteID: ref.id });
});

app.post('/finalize-registration', checkAuth, async (req, res) => {
  const { inviteID } = req.body;
  const doc = firestore.collection('invites').doc(inviteID);
  const invite = await doc.get();

  if (!invite.exists) {
    return res.status(404).end();
  }

  if (invite.get('email') !== res.userToken.email) {
    res.status(403).send('nice try');
    return;
  }

  await auth.setCustomUserClaims(res.userToken.uid, { verified: true });
  await doc.delete();

  res.send('ok');
});

app.post('/set-verified', checkAuth, checkAdmin, async (req, res) => {
  const { uid, verified } = req.query;
  await auth.setCustomUserClaims(uid as string, { verified: verified === 'true' });
  res.end('ok');
});

export default app;
