import { BeetStruct, u32, fixedSizeUint8Array, fixedSizeUtf8String } from '@metaplex-foundation/beet';

// Declare the Block class
class Block {
    timestamp: number;
    height: number;
    id: number;
    previousBlockHash: Uint8Array;
    merkleRoot: Uint8Array;
    miner: string;
    // Declare the class properties with the @field decorator

    // Define the class constructor
    constructor(
        id: number,
        height: number,
        timestamp: number,
        previousBlockHash: Uint8Array,
        merkleRoot: Uint8Array,
        miner: string,
    ) {
        // Assign the provided properties to the class instance
        this.id = id;
        this.height = height;
        this.timestamp = timestamp;
        this.previousBlockHash = previousBlockHash;
        this.merkleRoot = merkleRoot;
        this.miner = miner;
    }

    // Declare the BeetStruct for the Block class
    static readonly struct = new BeetStruct<Block>(
        // Define the fields of the struct
        [
            ['id', u32],
            ['height', u32],
            ['timestamp', u32],
            ['previousBlockHash', fixedSizeUint8Array(32)],
            ['merkleRoot', fixedSizeUint8Array(32)],
            ['miner', fixedSizeUtf8String(8)],
        ],

        // Define the constructor function for the struct

        (args) =>
            new Block(
                // @ts-ignore
                args.id,
                args.height,
                args.timestamp,
                args.previousBlockHash,
                args.merkleRoot,
                args.miner,
            ),
        // Give the struct a name for debugging purposes
        'Block',
    );
}

// Define the blockDeserialize function
const blockDeserialize = (buffer: Buffer): [Block, number] | null => {
    try {
        // Use the deserialize method of the BeetStruct to deserialize the buffer
        return Block.struct.deserialize(buffer);
    } catch (e) {
        // If an error occurs, return null
        return null;
    }
};

// Define the blockSerialize function
const blockSerialize = (block: Block): Buffer => {
    // Use the serialize method of the BeetStruct to serialize the Block instance
    return Block.struct.serialize(block)[0];
};



const buffer = blockSerialize(new Block(1, 888, 128299082, new Uint8Array(32).fill(0), new Uint8Array(32).fill(1), "0x123456"))

console.log(buffer);

const transaction = blockDeserialize(buffer);

console.log(transaction);