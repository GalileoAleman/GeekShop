import { initialData } from "./seed";
import { prisma } from '../lib/prisma';

//Se carga informacion de prueba para la base de dato de desarrollo
async function main(){

    //Se borran las tablas 
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    //Se usa los datos de prebas de la semilla de productos Geeks
    const {categories, products, users} = initialData

    //Se cargan los usuarios
    await prisma.user.createMany({
        data: users
    })

    //Se cargan las Categorias en la tabla de la bd 
    await prisma.category.createMany({
        data: categories.map((name) => ({name}))
    })

    const catsDb = await prisma.category.findMany();

    const catsMap = catsDb.reduce((map, category) =>{
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); //figurine: id

    //Se cargan los Productos.
    products.forEach(async(product) =>{
        const {type, category, images, ...prod} = product;

        const dbProduct = await prisma.product.create({
            data:{
                ... prod,
                categoryId: catsMap[type],
                type: category
            }
        });

        //Se carga la tabla de la imagenes de los productos
        const imgData = images.map(img => ({
            url : img,
            productId : dbProduct.id
        }));


        await prisma.productImage.createMany({
            data: imgData
        });
    });

    console.log("Proceso exitoso.")
}

(() => {
    main();
})();
