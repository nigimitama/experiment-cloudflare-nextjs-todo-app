import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDB() {
    const { env } = await getCloudflareContext<any>();
    return env.DB;
}
