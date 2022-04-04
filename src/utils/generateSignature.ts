// import { KJUR } from 'jsrsasign';

// export function generateSignature(
//   sdkKey: string,
//   sdkSecret: string,
//   meetingNumber: string,
//   role = 1,
// ) {
//   try {
//     const iat = Math.round((new Date().getTime() - 30000) / 1000);
//     const exp = iat + 60 * 60 * 2;
//     const oHeader = { alg: 'HS256', typ: 'JWT' };

//     const oPayload = {
//       sdkKey: sdkKey,
//       mn: meetingNumber,
//       role: role,
//       iat: iat,
//       exp: exp,
//       appKey: sdkKey,
//       tokenExp: iat + 60 * 60 * 2,
//     };

//     const sHeader = JSON.stringify(oHeader);
//     const sPayload = JSON.stringify(oPayload);
//     const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
//     return signature;
//   } catch (e) {
//     console.error(e);
//   }
//   return '';
// }

import crypto from 'crypto'; // crypto comes with Node.js
export function generateSignature(
  apiKey: string,
  apiSecret: string,
  meetingNumber: string,
  role = 0,
) {
  // Prevent time sync issue between client signature generation and Zoom
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
    'base64',
  );
  const hash = crypto
    .createHmac('sha256', apiSecret)
    .update(msg)
    .digest('base64');

  const signature = Buffer.from(
    apiKey,
    meetingNumber,
    timestamp,
    // eslint-disable-next-line
    // @ts-ignore
    role,
    hash,
  ).toString('base64');
  return signature;
}
