import { Schema } from 'mongoose';

export const applyGlobalSchemaOptions = (schema: Schema) => {
    // Remove _id & __v in response
    schema.set('toJSON', {
        transform: (_: any, ret: any) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    // Auto timestamps
    schema.set('timestamps', true);
};