import { google } from 'googleapis';


const GOOGLE_SERVICE_ACCOUNT = {
  type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE!,
  project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID!,
  private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID!,
  private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL!,
  client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID!,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CERT_URL!,
  universe_domain: "googleapis.com"
};

export async function getIndividualYoutubeClient(accessToken: string, refreshToken?: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return google.youtube({
    version: 'v3',
    auth: oauth2Client
  });
}

export function getYouTubeClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_SERVICE_ACCOUNT,
    scopes: ['https://www.googleapis.com/auth/youtube.upload']
  });

  return google.youtube({
    version: 'v3',
    auth
  });
} 
