import { currentUser, json } from "../../../../lib/auth/server";
export async function GET(request: Request) { return json({ user: await currentUser(request) }); }
