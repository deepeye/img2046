import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import FormData from 'form-data';

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

export async function POST(req: NextRequest) {
  try {
    console.log('Received request to remove background');
    
    if (!REMOVE_BG_API_KEY) {
      console.error('REMOVE_BG_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      console.error('No image file received');
      return NextResponse.json({ error: '缺少图像' }, { status: 400 });
    }

    console.log('Image file received, size:', image.size, 'type:', image.type);

    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // 创建一个新的 FormData 对象来发送到 remove.bg API
    const removeBgFormData = new FormData();
    removeBgFormData.append('image_file', imageBuffer, {
      filename: 'image.png',
      contentType: image.type,
    });

    console.log('Sending request to remove.bg API');
    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
      },
      body: removeBgFormData,
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      console.error('remove.bg API error:', removeBgResponse.status, errorText);
      throw new Error(`Failed to remove background: ${removeBgResponse.status} ${errorText}`);
    }

    console.log('Background removed successfully');
    const removedBgImage = await removeBgResponse.buffer();

    return new NextResponse(removedBgImage, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: '处理图像时出错: ' + (error as Error).message }, { status: 500 });
  }
}