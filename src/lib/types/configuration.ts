import type { Social } from './social';
import type { Project } from './project';
import type { ProfilePicture } from './profilePicture';

export interface Configuration {
	name: string;
	profilePicture?: ProfilePicture;
	primaryColor: string;
	pronouns: string;
	timezone: number;
	socials: Social[];
	projects: Project[];
}
