import { dbConnect } from '@/lib/db';
import Blog from '@/models/Blog';

// GET SINGLE BLOG BY SLUG
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return Response.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, blog }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// UPDATE BLOG
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await req.json();

    const updatedBlog = await Blog.findOneAndUpdate({ slug }, body, { new: true });

    if (!updatedBlog) {
      return Response.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return Response.json({ success: true, blog: updatedBlog });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE BLOG
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    const deleted = await Blog.findOneAndDelete({ slug });

    if (!deleted) {
      return Response.json({ success: false, message: 'Blog not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to delete blog' }, { status: 500 });
  }
}