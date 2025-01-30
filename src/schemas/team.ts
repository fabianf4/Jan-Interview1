import Member from "./members";

export interface bodyTeam {
	teams: Array<Team>;
}

export default interface Team {
	name: string;
	members: Array<Member>;
	_id: string;
	__v: string;
}
