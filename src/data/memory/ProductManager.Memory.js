class ProductManager {
    static #product = []

    create(data) {
        try {
            if (!data.title) {
                throw new Error('el producto no tiene titulo')
            } else {
                const product = {
                    id: ProductManager.#product.length === 0 ? 1 : ProductManager.#product[ProductManager.#product.length - 1].id + 1,
                    photo: data.photo,
                    title: data.title,
                    category: data.category,
                    price: data.price,
                    stock: data.stock
                }
                ProductManager.#product.push(product)
                console.log('producto creado');
            }
        } catch (error) {
            console.log(error);
        }

    }
    read() {
        try {
            const productos = ProductManager.#product
            if (!productos) {
                throw new Error('no se pudieron leer los productos')
            } else {
                return ProductManager.#product
            }

        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const one = ProductManager.#product.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el producto del id ingresado')
            } else {
                console.log(' se ha encontrado el usuario correctamente');
                console.log(one);
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }
    destroy(id) {
        try {
            const one = ProductManager.#product.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el id para eliminar')
            } else {
                let without = ProductManager.#product.filter((el) => el.id !== id)
                ProductManager.#product = without
                console.log(`producto numero : '${id}' borrado`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    update(id, data) {
        try {
          let all =  this.read();
          let one = all.find((each) => each.id === id);
          if (one) {
            for (let prop in data) {
              one[prop] = data[prop];
            }
            console.log(one);
            return one;
          } else {
            const error = new Error("Not founding!");
            error.statusCode = 404;
            throw error;
          }
        } catch (error) {
          throw error;
          
        }
      }
}






function mets() {


const gestorDeProductos = new ProductManager()

gestorDeProductos.create({
    photo: 'zapatilla.jpg ',
    title: 'zapatilla ',
    category: 'calzado',
    price: 100,
    stock: 1000
}) 

gestorDeProductos.create({
    photo: 'remera.jpg ',
    title: 'remera ',
    category: 'ropa',
    price: 200,
    stock: 203
}) 

gestorDeProductos.create({
    photo: 'ojotas.jpg ',
    title: 'ojota ',
    category: 'calzado',
    price: 50,
    stock: 605
}) 

gestorDeProductos.create({
    photo: 'pantalon.jpg ',
    title: 'pantalon ',
    category: 'pantalones',
    price: 70,
    stock: 1500
}) 
gestorDeProductos.create({
    photo: 'gorra.jpg ',
    title: 'gorra',
    category: 'gorros',
    price: 20,
    stock: 150
})
gestorDeProductos.create({
    photo: 'traje.jpg ',
    title: 'traje ',
    category: 'dress',
    price: 300,
    stock: 78
}) 

gestorDeProductos.create({
    photo: 'saco.jpg ',
    title: 'saco',
    category: 'ropa',
    price: 270,
    stock: 503
}) 
gestorDeProductos.create({
    photo: 'vestido.jpg ',
    title: 'vestido ',
    category: 'ropa mujer',
    price: 60,
    stock: 105
}) 

gestorDeProductos.create({
    photo: 'pollera.jpg ',
    title: 'pollera ',
    category: 'ropa mujer',
    price: 80,
    stock: 2500
}) 
gestorDeProductos.create({
    photo: 'chaleco.jpg ',
    title: 'chaleco',
    category: 'abrigos',
    price: 60,
    stock: 250
})

    //producto sin tittle
    gestorDeProductos.create({
        photo: 'falda.jpg ',
        category: 'abrigos',
        price: 60,
        stock: 250
    })


    // readOne
    gestorDeProductos.readOne(17)              //id no encontrado
    gestorDeProductos.readOne(10)              //me devuelve el producto

    // destroy
    gestorDeProductos.destroy(18)             //no encontrado
    gestorDeProductos.destroy(4)             //me elimina el producto del id  

    //READ
    console.log(gestorDeProductos.read());
}
mets()



