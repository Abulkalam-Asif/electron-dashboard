import * as jose from "jose";

export const signJwt = async (username: string) => {
  const token = new jose.SignJWT({
    username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h");

  const secret = import.meta.env.VITE_JWT_SECRET;
  if (!secret) throw new Error("JWT secret is not defined");
  return token.sign(new TextEncoder().encode(secret));
};
