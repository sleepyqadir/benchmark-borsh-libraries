import { BeetStruct, u32, u256, fixedSizeUtf8String, fixedSizeUint8Array } from '@metaplex-foundation/beet';

// Declare the MetaNode class
export class MetaNode {
    // Declare the class properties as readonly
    readonly id: number;
    readonly data: string;
    readonly idHash: Uint8Array;

    // Define the class constructor
    constructor(id: number, data: string, idHash: Uint8Array) {
        // Assign the provided properties to the class instance
        this.id = id;
        this.data = data;
        this.idHash = idHash;
    }

    // Declare the BeetStruct for the MetaNode class
    static readonly struct = new BeetStruct<MetaNode>(
        // Define the fields of the struct
        [
            ['id', u32],
            ['data', fixedSizeUtf8String(8)],
            ['idHash', fixedSizeUint8Array(32)],
        ],
        // Define the constructor function for the struct
        // @ts-ignore
        (args) => new MetaNode(args.id, args.data, args.idHash),
        // Give the struct a name for debugging purposes
        'MetaNode',
    );
}

// Define the metaDeserialize function
export const metaDeserialize = (buffer: Buffer): [MetaNode, number] | null => {
    try {
        // Use the deserialize method of the BeetStruct to deserialize the buffer
        return MetaNode.struct.deserialize(buffer);
    } catch (e) {
        // If an error occurs, return null
        return null;
    }
};

// Define the metaSerialize function
export const metaSerialize = (node: MetaNode): [Buffer, number] => {
    // Use the serialize method of the BeetStruct to serialize the MetaNode instance
    return MetaNode.struct.serialize(node);
};