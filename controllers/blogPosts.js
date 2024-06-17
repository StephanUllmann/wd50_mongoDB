import BlogPost from '../schemas/BlogPost.js';
import Author from '../schemas/Author.js';

// Search for blog posts

const searchBlogPosts = async (req, res) => {
  const { search } = req.query;
  try {
    const blogPosts = await BlogPost.find({ $text: { $search: search } })
      .populate('author', 'firstName lastName image')
      .lean();

    if (!blogPosts.length) {
      return res.status(404).json({ message: 'no blog posts found' });
    }
    res.json({ data: blogPosts });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

//  create blog post
const createBlogPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const blogPost = await BlogPost.create({ title, content, author });
    if (!blogPost) {
      return res.status(400).json({ message: 'Blog Post not created' });
    }

    const foundAuthor = await Author.findOneAndUpdate({ _id: author }, { $push: { posts: blogPost._id } });
    if (!foundAuthor) {
      return res.status(400).json({ message: 'Blog Post not created' });
    }

    res.json({ data: blogPost });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server error' });
    }
  }
};

export { searchBlogPosts, createBlogPost };
