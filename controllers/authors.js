import Author from '../schemas/Author.js';

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().lean();
    console.log(authors);
    if (!authors.length) {
      return res.status(404).json({ message: 'no authors found' });
    }

    res.json({ data: authors });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

//  Get single author
const getAuthor = async (req, res) => {
  const { id } = req.params;
  console.log('Hitting endpoint, ', id);
  try {
    const author = await Author.findById(id).populate('posts', 'title').lean();
    if (!author) {
      return res.status(404).json({ message: 'No author found' });
    }
    res.json({ data: author });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

const createAuthor = async (req, res) => {
  const { firstName, lastName, email, image } = req.body;
  try {
    const author = await Author.create({ firstName, lastName, email, image });
    res.status(201).json({ data: author });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server error' });
    }
  }
};

// Update Author
const updateAuthor = async (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, email, image } = req.body;
  const author = { firstName, lastName, email, image };

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(id, author, { upsert: true, new: true, runValidators: true });

    res.json({ data: updatedAuthor });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Input for Author invalid' });
    } else {
      res.status(500).json({ message: 'Internal Server error' });
    }
  }
};

// Delete Author
const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return res.status(404).json({ message: 'No author found' });
    }
    res.json({ message: 'Author removed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
};

export { createAuthor, getAuthors, getAuthor, updateAuthor, deleteAuthor };
