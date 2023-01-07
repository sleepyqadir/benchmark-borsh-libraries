import { NearNode, nearSerialize, nearDeserialize } from '../src/libs/near';

describe('Near Node', () => {
    let node: NearNode;
    let serialized: Buffer;
    beforeEach(() => {
        node = new NearNode({
            id: 123,
            data: 'sample data',
            idHash: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]),
        });
        serialized = nearSerialize(node);
    });

    test('serialize', () => {
        expect(serialized).toBeInstanceOf(Buffer);
    });

    test('deserialize', () => {
        const deserialized = nearDeserialize(serialized);
        expect(deserialized).toEqual(node);
    });
});



