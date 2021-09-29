
import Mongoose from 'mongoose';

export const Roles = ["user", "admin", "supervisor"]

const roleSchema = Mongoose.Schema(
    {
        name: String,

    },
    {
        versionKey: false,
    }
);

export default Mongoose.model("Role", roleSchema);