const Hapi = require('@hapi/hapi');
const booksRoute = require('./routes/books'); // Mengimpor routes buku

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  });

  server.route(booksRoute); // Menghubungkan routes dengan server

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
