import { deserialize, serialize, field } from '@dao-xyz/borsh';
import { NodeProperties } from '../interfaces/NodeProperties';

// Declare the DaoNode class
export class DaoNode {
    // Declare the class properties with the @field decorator
    @field({ type: 'u32' })
    id: number;

    @field({ type: 'string' })
    data: string;

    @field({ type: Uint8Array })
    idHash: Uint8Array;

    // Define the class constructor
    constructor(properties: NodeProperties) {
        // Assign the provided properties to the class instance
        this.id = properties.id;
        this.data = properties.data;
        this.idHash = properties.idHash;
    }
}

// Define the daoSerialize function
export const daoSerialize = (node: DaoNode): Buffer => {
    // Use the serialize function from the @dao-xyz/borsh library to serialize the node
    // @ts-ignore
    return serialize(node);
};

// Define the daoDeserialize function
export const daoDeserialize = (buffer: Buffer): DaoNode | null => {
    try {
        //
        // Use the deserialize function from the @dao-xyz/borsh library to deserialize the buffer
        return deserialize(buffer, DaoNode, { unchecked: true }) as DaoNode;
    } catch (e) {
        return null;
    }
};
