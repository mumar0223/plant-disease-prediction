import { Client } from "@gradio/client";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return Response.json({ error: "No image uploaded" }, { status: 400 });
    }

    const imageBlob = new Blob([await file.arrayBuffer()], {
      type: file.type,
    });

    // Correct auth property
    const client = await Client.connect(process.env.PROJECT_NAME as string, {
      token: process.env.HF_TOKEN as `hf_${string}`,
    });

    const result = await client.predict("/predict", {
      image: imageBlob,
    });

    const prediction = (result.data as string[])[0];

    return Response.json({ prediction });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Prediction failed" }, { status: 500 });
  }
}
