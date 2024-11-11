let books = []; // Menyimpan data buku sementara

// Menambahkan buku baru ke dalam array
const addBook = (book) => {
  books.push(book);
};

// Mengambil semua buku
const getAllBooks = () => {
  return books;
};

// Mengambil buku berdasarkan ID
const getBookById = (id) => {
  return books.find(book => book.id === id);
};

// Memperbarui buku berdasarkan ID
const updateBook = (id, updatedBook) => {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index] = updatedBook; // Memperbarui buku di array
  }
};

// Menghapus buku berdasarkan ID
const deleteBook = (id) => {
  books = books.filter(book => book.id !== id); // Menghapus buku dari array
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
