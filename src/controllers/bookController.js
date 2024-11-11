const { nanoid } = require('nanoid');
const bookModel = require('../models/bookModel'); // Mengimpor model buku

// Fungsi untuk menambahkan buku baru
const createBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const id = nanoid();
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  bookModel.addBook(newBook); // Menyimpan buku ke dalam model

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id
    }
  }).code(201);
};

// Fungsi untuk mendapatkan seluruh buku
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let books = bookModel.getAllBooks();

  if (name) {
    books = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (reading !== undefined) {
    books = books.filter(book => book.reading === (reading === '1'));
  }
  if (finished !== undefined) {
    books = books.filter(book => book.finished === (finished === '1'));
  }


  // Menyaring hanya properti id, name, dan publisher
  const filteredBooks = books.map(book => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher
  }));

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks
    }
  }).code(200);
};

// Fungsi untuk mendapatkan detail buku berdasarkan ID
const getBookById = (request, h) => {
  const { bookId } = request.params;
  const book = bookModel.getBookById(bookId);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book
    }
  }).code(200);
};

// Fungsi untuk memperbarui buku berdasarkan ID
const updateBook = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const book = bookModel.getBookById(bookId);
  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404);
  }

  const updatedBook = {
    id: book.id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading,
    insertedAt: book.insertedAt, // Tidak berubah
    updatedAt: new Date().toISOString() // Update waktu
  };

  bookModel.updateBook(bookId, updatedBook); // Memperbarui buku di dalam model

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  }).code(200);
};

// Fungsi untuk menghapus buku berdasarkan ID
const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const book = bookModel.getBookById(bookId);
  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404);
  }

  bookModel.deleteBook(bookId); // Menghapus buku dari model

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  }).code(200);
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
