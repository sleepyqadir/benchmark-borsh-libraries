import { AnchorNode } from '../src/libs/anchor';

describe('anchorNode', () => {
    let node: AnchorNode;
    let serialized: Buffer;
    beforeEach(() => {
        node = new AnchorNode({
            id: 123,
            data: 'sample data',
            idHash: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]),
        });
        serialized = node.serialize();
    });

    test('serialize', () => {
        expect(serialized).toBeInstanceOf(Buffer);
        expect(serialized.length).toBe(node.borshInstructionSchema.getSpan(serialized));
    });

    test('deserialize', () => {
        const deserialized = node.deserialize(serialized);
        expect(deserialized?.id).toEqual(node.id);
        expect(deserialized?.data).toEqual(node.data);

        expect(node.deserialize(Buffer.from([]))).toBeNull();
    });

    test('serialize and deserialize', () => {
        const deserialized = node.deserialize(serialized);
        expect(serialized.length).toBe(node.borshInstructionSchema.getSpan(serialized));
        expect(deserialized?.id).toEqual(node.id);
    });
});



