import "dotenv/config";
import project from "../models/mongo/project";
import member, { role } from "../models/mongo/member";
export default async function populateDB() {
	const populate = process.env.POPULATE;

	if (!populate) {
		return false;
	}
	try {
		const TheGuardians = await project.create({ name: "The Guardians" });
		const CorkInc = await project.create({ name: "Cork Inc." });
		const VCCapitals = await project.create({ name: "VC Capitals" });
		const RedArchitects = await project.create({ name: "Red Architects" });
		const LukeBrands = await project.create({ name: "Luke Brands" });
		const HomeBinds = await project.create({ name: "Home binds" });

		member.create({
			name: "Kristen Tyler",
			gender: "Female",
			urlImage: "https://randomuser.me/api/portraits/med/women/0.jpg",
			role: role.AccountManager,
			projects: [TheGuardians._id, CorkInc._id, VCCapitals._id],
		});
		member.create({
			name: "Mark Dressler",
			gender: "Male",
			urlImage: "https://randomuser.me/api/portraits/med/men/0.jpg",
			role: role.ProjectLeader,
			projects: [RedArchitects._id, VCCapitals._id, LukeBrands._id],
		});
		member.create({
			name: "Levy Curtis",
			gender: "Female",
			urlImage: "https://randomuser.me/api/portraits/med/women/1.jpg",
			role: role.EngineeringArchitect,
			projects: [LukeBrands._id, HomeBinds._id],
		});
		member.create({
			name: "Joe Davis",
			gender: "Male",
			urlImage: "https://randomuser.me/api/portraits/med/men/1.jpg",
			role: role.EngineeringArchitect,
			projects: [HomeBinds._id, VCCapitals._id, TheGuardians._id],
		});
		member.create({
			name: "Laura Vasquez",
			gender: "Female",
			urlImage: "https://randomuser.me/api/portraits/med/women/2.jpg",
			role: role.ProjectLeader,
			projects: [HomeBinds._id, CorkInc._id],
		});
		member.create({
			name: "Robert Chicks",
			gender: "Male",
			urlImage: "https://randomuser.me/api/portraits/med/men/2.jpg",
			role: role.AccountManager,
			projects: [LukeBrands._id, RedArchitects._id],
		});
		member.create({
			name: "Jeff Ritter",
			gender: "Male",
			urlImage: "https://randomuser.me/api/portraits/med/men/3.jpg",
			role: role.EngineeringArchitect,
			projects: [CorkInc._id, RedArchitects._id],
		});
		return true;
	} catch (error) {
		return false;
	}
}
