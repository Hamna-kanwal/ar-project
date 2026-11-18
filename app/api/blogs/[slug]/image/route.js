import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(_request, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug }).select('image').lean();

    if (!blog?.image) {
      return new Response('Blog image not found', { status: 404 });
    }

    if (!blog.image.startsWith('data:image/')) {
      let imageUrl;
      try {
        imageUrl = new URL(blog.image);
      } catch {
        console.error(`Invalid blog image data for slug: ${slug}`);
        return new Response('Invalid blog image', { status: 500 });
      }

      if (imageUrl.protocol !== 'https:' || !imageUrl.hostname) {
        console.error(`Invalid blog image URL for slug: ${slug}`);
        return new Response('Invalid blog image', { status: 500 });
      }

      return Response.redirect(imageUrl, 302);
    }

    const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]*)$/.exec(blog.image);
    if (!match) {
      console.error(`Invalid blog image data for slug: ${slug}`);
      return new Response('Invalid blog image', { status: 500 });
    }

    return new Response(Buffer.from(match[2], 'base64'), {
      headers: {
        'Content-Type': match[1],
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('GET BLOG IMAGE ERROR:', error.message);
    return new Response('Failed to fetch blog image', { status: 500 });
  }
}
