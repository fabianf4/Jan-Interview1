import { DataTypes } from "sequelize";
import sequelize from "../../config/mysql";

const userModel = sequelize.define("user", {
	id: {
		primaryKey: true,
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

(async () => {
	await userModel.sync();
})();

export default userModel;
