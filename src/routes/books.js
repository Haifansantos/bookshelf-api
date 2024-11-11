const bookController = require('../controllers/bookController'); // Mengimpor controller buku

const booksRoute = [
  {
    method: 'POST',
    path: '/books',
    handler: bookController.createBook // Menggunakan controller untuk membuat buku
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookController.getAllBooks // Menggunakan controller untuk mendapatkan buku
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookController.getBookById // Menggunakan controller untuk mendapatkan detail buku berdasarkan ID
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookController.updateBook // Menggunakan controller untuk memperbarui buku berdasarkan ID
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookController.deleteBook // Menggunakan controller untuk menghapus buku berdasarkan ID
  }
];

module.exports = booksRoute;
