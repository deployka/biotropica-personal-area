import { KJUR } from 'jsrsasign';
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
//     console.error('[ZOOM signature]:', e);
//     return '';
//   }
// }

// https://www.npmjs.com/package/jsrsasign
export function generateSignature(sdkKey: string, sdkSecret: string, meetingNumber: string, role: number) {
  const iat = Math.round((new Date().getTime() - 30000) / 1000);
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    sdkKey: sdkKey,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: sdkKey,
    tokenExp: iat + 60 * 60 * 2,
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
  return sdkJWT;
}
