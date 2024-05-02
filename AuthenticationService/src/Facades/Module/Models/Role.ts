import mongoose, { Document, Schema } from 'mongoose';
import Action, { IAction } from './Action';

export interface RoleDocument extends Document {
  name: string;
  actions: IAction['_id'][];
}

const roleSchema = new Schema<RoleDocument>({
  name: { type: String, required: true, unique: true },
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action', default: [] }]
});

roleSchema.pre<RoleDocument>('save', async function(next) {
  try {
    if (!(await Action.countDocuments())) {
      const defaultAction = await Action.create({ url: '*', type: 'all' });
      this.actions.push(defaultAction._id);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const Role = mongoose.model<RoleDocument>('Role', roleSchema);

export default Role;
