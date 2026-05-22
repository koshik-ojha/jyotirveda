import { pullOracle, askYesNo } from "@/lib/psychic";

export const runtime = "nodejs";

export async function GET(request) {
  const u = new URL(request.url);
  const mode = u.searchParams.get("mode") || "oracle";
  const seed = u.searchParams.get("seed") || "";
  const question = u.searchParams.get("q") || "";
  if (mode === "yesno") return Response.json({ result: askYesNo({ seed, question }) });
  return Response.json({ result: pullOracle({ seed, question }) });
}
