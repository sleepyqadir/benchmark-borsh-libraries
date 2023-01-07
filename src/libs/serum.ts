import * as borsh from '@project-serum/borsh'
import { NodeProperties } from '../interfaces/NodeProperties';

export class SerumNode {
    id: number;
    data: string;
    idHash: Uint8Array;

    constructor(properties: NodeProperties) {
        this.id = properties.id;
        this.data = properties.data;
        this.idHash = properties.idHash;
    }

    borshInstructionSchema = borsh.struct([
        borsh.u32('id'),
        borsh.str("data"),
        borsh.array(borsh.u8(), 32, 'idHash'),
    ])

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({ ...this }, buffer)
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer))
    }

    deserialize(buffer: Buffer): SerumNode | null {
        try {
            return this.borshInstructionSchema.decode(buffer)
        } catch (e) {
            return null
        }
    }
}