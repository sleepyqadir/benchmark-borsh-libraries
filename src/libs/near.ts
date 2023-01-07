import { deserialize, serialize } from "borsh";

class Assignable {
    constructor(properties: any) {
        Object.keys(properties).map((key) => {
            //@ts-ignore
            this[key] = properties[key];
        });
    }
}

export class NearNode extends Assignable {

}

let schema = new Map([[NearNode, { kind: 'struct', fields: [['id', 'u32'], ['data', "string"], ['idHash', [32]]] }]]);

export const nearDeserialize = (buffer: Buffer): NearNode => {
    return deserialize(schema, NearNode, buffer)
}

export const nearSerialize = (node: NearNode): Buffer => {
    // @ts-ignore
    return serialize(schema, node);
}

