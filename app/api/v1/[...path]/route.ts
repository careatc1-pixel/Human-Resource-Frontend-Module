import { NextRequest } from 'next/server';

type Params = {
  path: string[];
};

export async function GET(req: NextRequest, ctx: { params: Promise<Params> }) {
  return proxy(req, ctx);
}

export async function POST(req: NextRequest, ctx: { params: Promise<Params> }) {
  return proxy(req, ctx);
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<Params> }) {
  return proxy(req, ctx);
}

export async function PUT(req: NextRequest, ctx: { params: Promise<Params> }) {
  return proxy(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<Params> }) {
  return proxy(req, ctx);
}

async function proxy(req: NextRequest, ctx: { params: Promise<Params> }) {
  const { path } = await ctx.params;

  if (!process.env.MG_USERS_URL) {
    return new Response('MG_USERS_URL is not defined', { status: 500 });
  }

  // include query parameters
  const targetUrl = `${process.env.MG_USERS_URL}/${path.join('/')}${req.nextUrl.search}`;

  const headers: HeadersInit = {};
  const contentType = req.headers.get('content-type');
  const auth = req.headers.get('authorization');

  if (contentType) headers['content-type'] = contentType;
  if (auth) headers['authorization'] = auth;

  let body: BodyInit | undefined = undefined;

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const text = await req.text();
    if (text) body = text;
  }

  const res = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    cache: 'no-store',
  });

  if (res.status === 204) {
    return new Response(null, { status: 204 });
  }

  return new Response(await res.text(), {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'application/json',
    },
  });
}
