import Project from "./project";

export interface bodyMember {
	members: Array<Member>;
}

export default interface Member {
	createdAt: string;
	gender: string;
	name: string;
	projects: Array<Project>;
	role: string;
	updatedAt: string;
	urlImage: string;
	__v: number;
	_id: string;
}
