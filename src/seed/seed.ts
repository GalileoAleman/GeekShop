import bcryptjs from 'bcryptjs';

interface GeekProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;
    // Define la categoría del producto: anime o comic.
    category: ValidCategories;
    // Tipo de producto disponible.
    type: GeekProductType;
  }
  
  interface BetaUser{
    email: string;
    password: string;
    name: string;
    role: ValidRole;
  }

  type ValidRole= 'admin' | 'user';

  type ValidCategories = 'anime' | 'comic';
  type GeekProductType = 'figurine' | 'manga' | 'poster' | 'accessory';
  
  interface SeedData {
    users: BetaUser[];
    products: GeekProduct[];
    categories: string[];
  }
  
  export const initialData: SeedData = {
    users:[
      {
        email: "gali@gmail.com",
        name: "Galileo",
        password: bcryptjs.hashSync("gali123"),
        role: "admin"
      },
      {
        email: "andree@gmail.com",
        name: "Andree",
        password: bcryptjs.hashSync("andree123"),
        role: "user"
      }
    ],
    categories: [
      'Figurine', 'Manga', 'Poster', 'Accessory'
    ],
    products: [
      // ======================
      // Productos de la categoría ANIME
      // ======================
      {
        description:
          "Figura articulada de Naruto Uzumaki, con detalles fieles al anime y acabados premium, ideal para coleccionistas.",
        images: [
          "naruto_figurine1.jpg",
          "naruto_figurine2.jpg",
          "naruto_figurine3.jpg",
          "naruto_figurine4.jpg",
        ],
        inStock: 10,
        price: 50,
        slug: "naruto-figurine",
        tags: ["coleccionable", "ninja", "acción"],
        title: "Figura Naruto Uzumaki",
        category: "anime",
        type: "figurine",
      },
      {
        description:
          "Figura dinámica de Monkey D. Luffy, capturando la esencia del capitán de los Sombrero de Paja en plena acción.",
        images: [
          "luffy_figurine1.jpg",
          "luffy_figurine2.jpg",
          "luffy_figurine3.jpg",
          "luffy_figurine4.jpg",
        ],
        inStock: 8,
        price: 55,
        slug: "luffy-figurine",
        tags: ["coleccionable", "aventura", "pirata"],
        title: "Figura Monkey D. Luffy",
        category: "anime",
        type: "figurine",
      },
      {
        description:
          "Edición especial del manga de One Piece, con portada alternativa y extras para los fans más exigentes.",
        images: [
          "one_piece_manga1.jpg",
          "one_piece_manga2.jpg",
          "one_piece_manga3.jpg",
          "one_piece_manga4.jpg",
        ],
        inStock: 15,
        price: 22,
        slug: "one-piece-manga",
        tags: ["manga", "piratas", "aventura"],
        title: "Manga One Piece",
        category: "anime",
        type: "manga",
      },
      {
        description:
          "Manga original de My Hero Academia, repleto de acción y el desarrollo de tus héroes favoritos.",
        images: [
          "mha_manga1.jpg",
          "mha_manga2.jpg",
          "mha_manga3.jpg",
          "mha_manga4.jpg",
        ],
        inStock: 12,
        price: 20,
        slug: "mha-manga",
        tags: ["manga", "héroes", "acción"],
        title: "Manga My Hero Academia",
        category: "anime",
        type: "manga",
      },
      {
        description:
          "Póster a todo color de Dragon Ball Z, impreso en papel premium para que sientas el poder Saiyan en tu pared.",
        images: [
          "dbz_poster1.jpg",
          "dbz_poster2.jpg",
          "dbz_poster3.jpg",
          "dbz_poster4.jpg",
        ],
        inStock: 25,
        price: 18,
        slug: "dbz-poster",
        tags: ["decoración", "acción", "clásico"],
        title: "Póster Dragon Ball Z",
        category: "anime",
        type: "poster",
      },
      {
        description:
          "Póster oficial de Attack on Titan, perfecto para ambientar tu espacio con el dramatismo del anime.",
        images: [
          "aot_poster1.jpg",
          "aot_poster2.jpg",
          "aot_poster3.jpg",
          "aot_poster4.jpg",
        ],
        inStock: 20,
        price: 20,
        slug: "aot-poster",
        tags: ["decoración", "acción", "épico"],
        title: "Póster Attack on Titan",
        category: "anime",
        type: "poster",
      },
      {
        description:
          "Accesorio imprescindible: llavero de My Hero Academia, para llevar siempre contigo el espíritu de la academia de héroes.",
        images: [
          "mha_keychain1.jpg",
          "mha_keychain2.jpg",
          "mha_keychain3.jpg",
          "mha_keychain4.jpg",
        ],
        inStock: 30,
        price: 8,
        slug: "mha-keychain",
        tags: ["accesorio", "llavero", "héroes"],
        title: "Llavero My Hero Academia",
        category: "anime",
        type: "accessory",
      },
      {
        description:
          "Accesorio exclusivo: colgante inspirado en Sailor Moon, ideal para los fans del anime y su magia.",
        images: [
          "sailor_moon_accessory1.jpg",
          "sailor_moon_accessory2.jpg",
          "sailor_moon_accessory3.jpg",
          "sailor_moon_accessory4.jpg",
        ],
        inStock: 25,
        price: 12,
        slug: "sailor-moon-accessory",
        tags: ["accesorio", "joyería", "mágico"],
        title: "Colgante Sailor Moon",
        category: "anime",
        type: "accessory",
      },
      {
        description:
          "Figura de Goku en plena transformación Super Saiyan, con detalles en colores vibrantes y postura dinámica.",
        images: [
          "goku_figurine1.jpg",
          "goku_figurine2.jpg",
          "goku_figurine3.jpg",
          "goku_figurine4.jpg",
        ],
        inStock: 9,
        price: 60,
        slug: "goku-figurine",
        tags: ["coleccionable", "acción", "dragonball"],
        title: "Figura Goku Super Saiyan",
        category: "anime",
        type: "figurine",
      },
      {
        description:
          "Póster exclusivo de Demon Slayer, que captura la intensidad y el arte del anime en una obra única para tu pared.",
        images: [
          "demon_slayer_poster1.jpg",
          "demon_slayer_poster2.jpg",
          "demon_slayer_poster3.jpg",
          "demon_slayer_poster4.jpg",
        ],
        inStock: 18,
        price: 19,
        slug: "demon-slayer-poster",
        tags: ["decoración", "acción", "fantasía"],
        title: "Póster Demon Slayer",
        category: "anime",
        type: "poster",
      },
  
      // ======================
      // Productos de la categoría CÓMIC
      // ======================
      {
        description:
          "Figura de colección de Batman, con alto nivel de detalle en su traje y accesorios, perfecta para los fans del Caballero Oscuro.",
        images: [
          "batman_figurine1.jpg",
          "batman_figurine2.jpg",
          "batman_figurine3.jpg",
          "batman_figurine4.jpg",
        ],
        inStock: 7,
        price: 65,
        slug: "batman-figurine",
        tags: ["coleccionable", "oscuro", "DC"],
        title: "Figura Batman",
        category: "comic",
        type: "figurine",
      },
      {
        description:
          "Figura imponente de Superman, que captura la fuerza y el heroísmo del Hombre de Acero en cada detalle.",
        images: [
          "superman_figurine1.jpg",
          "superman_figurine2.jpg",
          "superman_figurine3.jpg",
          "superman_figurine4.jpg",
        ],
        inStock: 6,
        price: 70,
        slug: "superman-figurine",
        tags: ["coleccionable", "clásico", "DC"],
        title: "Figura Superman",
        category: "comic",
        type: "figurine",
      },
      {
        description:
          "Edición especial del 'manga' de The Sandman, una obra gráfica que redefine el cómic con narrativa oscura y surrealista.",
        images: [
          "sandman_manga1.jpg",
          "sandman_manga2.jpg",
          "sandman_manga3.jpg",
          "sandman_manga4.jpg",
        ],
        inStock: 5,
        price: 28,
        slug: "sandman-manga",
        tags: ["grafico", "oscuro", "coleccionable"],
        title: "The Sandman: Edición Especial",
        category: "comic",
        type: "manga",
      },
      {
        description:
          "Edición limitada de Watchmen, el clásico cómic que revolucionó la narrativa gráfica, en formato de manga.",
        images: [
          "watchmen_manga1.jpg",
          "watchmen_manga2.jpg",
          "watchmen_manga3.jpg",
          "watchmen_manga4.jpg",
        ],
        inStock: 4,
        price: 30,
        slug: "watchmen-manga",
        tags: ["grafico", "oscuro", "clásico"],
        title: "Watchmen: Edición Limitada",
        category: "comic",
        type: "manga",
      },
      {
        description:
          "Póster oficial de Spider-Man, impreso en alta resolución para capturar la agilidad y el espíritu del trepamuros.",
        images: [
          "spiderman_poster1.jpg",
          "spiderman_poster2.jpg",
          "spiderman_poster3.jpg",
          "spiderman_poster4.jpg",
        ],
        inStock: 20,
        price: 22,
        slug: "spiderman-poster",
        tags: ["decoración", "acción", "Marvel"],
        title: "Póster Spider-Man",
        category: "comic",
        type: "poster",
      },
      {
        description:
          "Póster vibrante de Wonder Woman, perfecto para darle un toque heroico y elegante a cualquier espacio.",
        images: [
          "wonder_woman_poster1.jpg",
          "wonder_woman_poster2.jpg",
          "wonder_woman_poster3.jpg",
          "wonder_woman_poster4.jpg",
        ],
        inStock: 15,
        price: 24,
        slug: "wonder-woman-poster",
        tags: ["decoración", "heroico", "DC"],
        title: "Póster Wonder Woman",
        category: "comic",
        type: "poster",
      },
      {
        description:
          "Accesorio imprescindible: llavero de Spider-Man, ideal para llevar la agilidad y el espíritu del héroe de Marvel a todas partes.",
        images: [
          "spiderman_accessory1.jpg",
          "spiderman_accessory2.jpg",
          "spiderman_accessory3.jpg",
          "spiderman_accessory4.jpg",
        ],
        inStock: 28,
        price: 10,
        slug: "spiderman-accessory",
        tags: ["accesorio", "llavero", "Marvel"],
        title: "Llavero Spider-Man",
        category: "comic",
        type: "accessory",
      },
      {
        description:
          "Accesorio exclusivo: mini figura de Iron Man, perfecta para adornar tu escritorio con el poder de la tecnología.",
        images: [
          "ironman_accessory1.jpg",
          "ironman_accessory2.jpg",
          "ironman_accessory3.jpg",
          "ironman_accessory4.jpg",
        ],
        inStock: 20,
        price: 15,
        slug: "ironman-accessory",
        tags: ["accesorio", "miniatura", "Marvel"],
        title: "Mini Figura Iron Man",
        category: "comic",
        type: "accessory",
      },
      {
        description:
          "Figura irreverente de Deadpool, capturando el humor y la audacia del mercenario más popular de Marvel.",
        images: [
          "deadpool_figurine1.jpg",
          "deadpool_figurine2.jpg",
          "deadpool_figurine3.jpg",
          "deadpool_figurine4.jpg",
        ],
        inStock: 9,
        price: 55,
        slug: "deadpool-figurine",
        tags: ["coleccionable", "acción", "Marvel"],
        title: "Figura Deadpool",
        category: "comic",
        type: "figurine",
      },
      {
        description:
          "Póster impactante del Joker, que resalta la caótica y enigmática esencia del archienemigo de Batman.",
        images: [
          "joker_poster1.jpg",
          "joker_poster2.jpg",
          "joker_poster3.jpg",
          "joker_poster4.jpg",
        ],
        inStock: 14,
        price: 23,
        slug: "joker-poster",
        tags: ["decoración", "oscuro", "DC"],
        title: "Póster Joker",
        category: "comic",
        type: "poster",
      },
    ],
  };
  