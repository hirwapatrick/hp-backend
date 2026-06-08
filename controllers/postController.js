import Post from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.published !== undefined) {
      filter.published = req.query.published === 'true';
    }
    const posts = await Post.find(filter)
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = { ...req.body, author: req.user.id };
    if (req.file) data.coverImage = req.file.path;
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim());
    }
    if (data.featured === 'true' || data.featured === true) data.featured = true;
    else if (data.featured === 'false' || data.featured === false) data.featured = false;
    if (data.published === 'true' || data.published === true) data.published = true;
    else if (data.published === 'false' || data.published === false) data.published = false;
    const post = await Post.create(data);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.coverImage = req.file.path;
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(t => t.trim());
    }
    if (data.featured === 'true' || data.featured === true) data.featured = true;
    else if (data.featured === 'false' || data.featured === false) data.featured = false;
    if (data.published === 'true' || data.published === true) data.published = true;
    else if (data.published === 'false' || data.published === false) data.published = false;
    const post = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
