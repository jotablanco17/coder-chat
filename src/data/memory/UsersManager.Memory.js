class UserManager {
    static #users = []
    create(data) {
        try {
            if (!data.password) {
                throw new Error('el usuario no tiene contraseña')
            } else {
                const user = {
                    id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1,
                    foto: data.foto,
                    email: data.email,
                    password: data.password,
                    role: 0,
                }
                UserManager.#users.push(user)
            }
        } catch (error) {
            console.log(error);
        }

    }
    read() {
        try {
            const usuarios = UserManager.#users
            if (!usuarios) {
                throw new Error('no se pudieron leer los usuarios')
            } else {
                return UserManager.#users
            }

        } catch (error) {
            console.log(error);
        }

    }
    readOne(id) {
        try {
            const one = UserManager.#users.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el id')
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
            const one = UserManager.#users.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el id')
            } else {
                let without = UserManager.#users.filter((el) => el.id !== id)
                UserManager.#users = without
                console.log(`usuario numero : '${id}' borrado`);
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



const generadorDeUsuarios = new UserManager()

function mets() {

    // create

    generadorDeUsuarios.create({
        foto: 'foto.png',
        email: 'maria@gmail.com',
    })

    generadorDeUsuarios.create({
        foto: 'foto.png',
        email: 'jota@gmail.com',
        password: 'jota123'
    })
    generadorDeUsuarios.create({
        foto: 'foto.png',
        email: 'juliana@gmail.com',
        password: 'juliana23'
    })
    generadorDeUsuarios.create({
        foto: 'foto.png',
        email: 'mauro@gmail.com',
        password: 'mauroi123'
    })
    generadorDeUsuarios.create({
        foto: 'foto.png',
        email: 'coti@gmail.com',
        password: 'jcoti123'
    })
    // readOne
    generadorDeUsuarios.readOne(6)              //id no encontrado
    generadorDeUsuarios.readOne(3)              //me devuelve el usuario

    // destroy
    generadorDeUsuarios.destroy(7)             //no encontrado
    generadorDeUsuarios.destroy(4)             //me elimina el usuario del id  

    //READ
    console.log(generadorDeUsuarios.read());

}
mets()

