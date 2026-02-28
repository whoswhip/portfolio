import type { Link } from './link';
import type { Project } from './project';
import type { ProfilePicture } from './profilePicture';

export interface Configuration {
	name: string;
	title?: string;
	shortDescription?: string;
	profilePicture?: ProfilePicture;
	primaryColor: string;
	pronouns: string;
	timezone: number;
	links: Link[];
	projects: Project[];
}
