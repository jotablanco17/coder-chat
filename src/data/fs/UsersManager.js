import fs from 'fs'
import crypto from 'crypto'


class UserManager {
    constructor() {
        this.path = './src/data/fs/files/users.json'
        this.init()
    }

    init() {
        const exist = fs.existsSync(this.path)
        if (!exist) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log('archivo creado');
        }
    }

    async create(data) {
        try {
            const product = {
                id: crypto.randomBytes(12).toString('hex'),
                photo: data.photo || 'url',
                role: data.role || 0,
                email: data.email,
                password: data.password
            }

            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            all.push(product);
            all = JSON.stringify(all, null, 2);
            await fs.promises.writeFile(this.path, all);
            return product;

        } catch (error) {
            throw error;
        }
    }



    async read(role = 0) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            if (!role || role === 0) {
                return all
            } else {
                const filtered = all.filter((el) => el.role === role);
                if (filtered.length === 0) {
                    return null;
                } else {
                    console.log(filtered)
                    return filtered;
                }
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el id')
            } else {
                console.log('se encontro el producto correctamente');
                console.log(one);
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroyId(id) {
        try {
            let all = await fs.promises.readFile(this.path, 'utf-8')
            all = JSON.parse(all)
            const one = all.find((el) => el.id === id)
            if (!one) {
                throw new Error('no se encontro el producto a eliminar')
            } else {
                let filtered = all.filter((el) => el.id !== id)
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered)
                console.log(`usuario : '${id}' eliminado `);
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }
    async update(id, data) {
        try {
            let all = await this.read();
            let one = all.find((each) => each.id === id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
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

const users = new UserManager()
export default users

async function mets() {
    await users.create({
        role: '0',
        photo: 'jota.png',
        email: 'jota@gmail.com',
        password: 'jota123'
    })
    await users.create({
        email: 'martin@gmail.com',
        password: 'martin123'
    })
    await users.create({
        role: '2',
        photo: 'jaime.png',
        email: 'jaime@gmail.com',
        password: 'jaime23'
    })
    await users.create({

        email: 'coti@gmail.com',
        password: 'coti123'
    })
    await users.read();


    // await users.readOne(1111)                         
    // await users.readOne("4cd24ce955d04c4a612cfa39")

    // await users.destroyId(34131)                      
    // await users.destroyId("c4f58ff5676d6181198d5beb")

}

