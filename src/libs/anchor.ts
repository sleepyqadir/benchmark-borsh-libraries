import * as borsh from '@coral-xyz/borsh';
import { NodeProperties } from '../interfaces/NodeProperties';

// Declare the AnchorNode class
export class AnchorNode {
    // Declare the class properties
    id: number;
    data: string;
    idHash: Uint8Array;

    // Declare the Borsh schema for the class
    borshInstructionSchema = borsh.struct([
        borsh.u32('id'),
        borsh.str('data'),
        borsh.array(borsh.u8(), 32, 'idHash'),
    ]);

    // Define the class constructor
    constructor(properties: NodeProperties) {
        // Assign the provided properties to the class instance
        this.id = properties.id;
        this.data = properties.data;
        this.idHash = properties.idHash;
    }

    // Define the serialize method
    serialize(): Buffer {
        // Allocate a new Buffer with a large enough capacity
        const buffer = Buffer.alloc(1000);
        // Encode the class instance into the Buffer using the Borsh schema
        this.borshInstructionSchema.encode({ ...this }, buffer);
        // Return a slice of the Buffer containing only the used portion
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
    }

    // Define the deserialize method
    deserialize(buffer: Buffer): AnchorNode | null {
        try {
            // Try to decode the serialized Buffer using the Borsh schema
            return this.borshInstructionSchema.decode(buffer);
        } catch (e) {
            return null;
        }
    }
}