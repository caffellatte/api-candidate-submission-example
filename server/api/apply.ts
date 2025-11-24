import { ProxyAgent } from "undici";
import { defineHandler } from "nitro/h3";

import { sha256 } from "~/server/utils";

export default defineHandler(async (event) => {
  const apiUrl = process.env.API_URL;

  const proxyAgent = new ProxyAgent("http://127.0.0.1:9999");

  const raw = await event.req.formData();

  const cvFile = raw.get("cv") as File | null;
  const name = (raw.get("name") as string) || "";
  const email = (raw.get("email") as string) || "";
  const message = (raw.get("message") as string) || "";
  const role = (raw.get("role") as string) || "";
  const experienceLevel = (raw.get("experienceLevel") as string) || "";
  const experienceYears = raw.get("experienceYears") as string;
  const salary = raw.get("salary") as string;
  const isDryRun = (raw.get("isDryRun") as string) || "";

  const timestamp = Date.now();
  const signature = sha256(`${name}-${timestamp}`);

  const payload: Record<string, string | number> = { name, email };

  if (message) payload.message = message;
  if (role) payload.role = role;
  if (experienceYears) payload.experienceYears = Number(experienceYears);
  if (experienceLevel) payload.experienceLevel = experienceLevel;
  if (salary) payload.salary = Number(salary);

  const formData = new FormData();

  formData.append("cv", cvFile!);
  formData.append("payload", JSON.stringify(payload));

  const request = {
    method: "POST",
    body: formData,
    headers: {
      "x-timestamp": `${timestamp}`,
      "x-signature": signature,
    } as Record<string, string>,
    // @ts-ignore
    dispatcher: proxyAgent,
  };

  if (isDryRun === "true") {
    request.headers["x-dry-run"] = "true";
  }

  const response = await fetch(apiUrl!, request);

  return response;
});
