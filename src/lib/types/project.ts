export interface Project {
	id: string;
	title: string;
	description: string;
	gitProvider: string;
	gitUrl: string;
	liveUrl?: string;
}
