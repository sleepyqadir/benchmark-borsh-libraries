import { DaoNode, daoSerialize, daoDeserialize } from '../src/libs/dao';

describe('DaoNode', () => {
    let node: DaoNode;
    let serialized: Buffer;
    beforeEach(() => {
        node = new DaoNode({
            id: 123,
            data: 'sample data',
            idHash: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]),
        });
        serialized = daoSerialize(node)
    });

    test('serialize', () => {
        expect(serialized).toBeInstanceOf(Uint8Array);
    });

    test('deserialize', () => {
        const deserialized = daoDeserialize(serialized);
        expect(deserialized?.id).toEqual(node.id);
        expect(deserialized?.data).toEqual(node.data);

        expect(daoDeserialize(Buffer.from([]))).toBeNull();
    });

    test('serialize and deserialize', () => {
        const deserialized = daoDeserialize(serialized);
        expect(deserialized?.id).toEqual(node.id);
    });
});



