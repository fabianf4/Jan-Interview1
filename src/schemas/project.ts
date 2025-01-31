export interface bodyProject {
	projects: Array<Project>;
}
export default interface Project {
	_id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
