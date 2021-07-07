import { ProductStore } from '../product';
import { OrderStore } from '../order';

const p_store = new ProductStore();
const o_store = new OrderStore();

describe('Product and Order', () => {
    it('create an order', async () => {
        const order = await o_store.create(1);
        expect(order).toEqual({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });

    it('show method should return the correct model', async () => {
        const result = await o_store.show('1');
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });
});
