import { UserStore } from '../models/user';

const store = new UserStore();

describe('User Model', () => {
    it('create method should add a record', async () => {
        const result = await store.create({
            id: 1,
            firstname: 'first',
            lastname: 'last',
            password: 'password',
        });
        expect(result.password).not.toEqual('password');
    });

    it('index method should return a list', async () => {
        const result = await store.index();
        // one from endpoint test
        expect(result.length).toEqual(2);
    });

    it('show method should return the correct model', async () => {
        const result = await store.show('1');
        expect(result.id).toEqual(1);
    });
});
