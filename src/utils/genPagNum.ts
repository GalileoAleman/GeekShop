export const genPagNums = ( currentPage: number, totalPages: number) => {

    //Si el numero total de paginas es 5 o menos
    //Se va a mostrar todas las paginas sin puntos suspensivos
    if ( totalPages <= 5 ) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    //Si la pagina actual esta entre las primeras 3 paginas
    if ( currentPage <= 3 ) {
      return [1,2,3,'...', totalPages -1 , totalPages];
    }
  
    // Si la pagina actual estra entre las ultimas 3 paginas
    if ( currentPage >= totalPages - 2 ) {
      return [1,2, '...', totalPages -2, totalPages -1, totalPages];
    }
  
    // Si la pagina actual esta en otro lugar medio
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  }
