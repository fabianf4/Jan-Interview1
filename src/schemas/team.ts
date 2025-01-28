import Member from "./members";

export default interface Team {
	name: string;
	members: Array<Member>;
	_id: string;
	__v: string;
}
