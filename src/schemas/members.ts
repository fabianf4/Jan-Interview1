import Project from "./project";

export enum Roles {
	ProjectLeader = "Project Leader",
	EngineeringArchitecht = "Engineering Architect",
	AccountManager = "Account Manager",
}

export interface bodyMember {
	members: Array<Member>;
}

export default interface Member {
	createdAt: string;
	gender: string;
	name: string;
	projects: Array<Project>;
	role: Roles;
	updatedAt: string;
	urlImage: string;
	__v: number;
	_id: string;
}
