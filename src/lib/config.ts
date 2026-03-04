import type { Configuration } from './types/configuration';

export const config: Configuration = {
	name: 'whoswhip',
	shortDescription: "I'm a full stack developer, mainly working with C#.",
	profilePicture: {
		url: '/pfp.webp',
		alt: 'Picture of an orange sunset with trees and a power line in the foreground, taken by whoswhip'
	},
	primaryColor: '#ddbe94',
	pronouns: 'He/Him',
	timezone: -5,
	links: [
		{
			id: 'github',
			label: 'Github',
			url: 'https://github.com/whoswhip',
			display: 'whoswhip'
		},
		{
			id: 'gitea',
			label: 'Gitea',
			url: 'https://git.whoswhip.dev/whoswhip',
			display: 'whoswhip'
		},
		{
			id: 'x',
			label: 'X',
			url: 'https://x.com/whereswhip',
			display: 'whereswhip'
		},
		{
			id: 'lastfm',
			label: 'Last.fm',
			url: 'https://www.last.fm/user/whoswhip',
			display: 'whoswhip'
		},
		{
			id: 'email',
			label: 'Email',
			url: 'mailto:contact@whoswhip.dev',
			display: 'contact@whoswhip.dev'
		}
	],
	projects: [
		{
			id: 'portfolio',
			title: 'This Portfolio',
			description: 'The source code for this portfolio website.',
			gitProvider: 'gitea',
			gitUrl: 'https://git.whoswhip.dev/whoswhip/portfolio'
		},
		{
			id: 'sharpbin',
			title: 'Sharpbin',
			description: 'A pastebin-esque website with syntax highlighting and ephemeral paste support.',
			gitProvider: 'github',
			gitUrl: 'https://github.com/whoswhip/sharpbin',
			liveUrl: 'https://sharpbin.cc'
		},
		{
			id: 'anilyzer',
			title: 'Anilyzer',
			description:
				'A website to analyze your anime and manga (mostly manga) statistics from Anilist.co using Mangabaka.org database dumps for series information.',
			gitProvider: 'github',
			gitUrl: 'https://github.com/whoswhip/anilyzer',
			liveUrl: 'https://anilyzer.whoswhip.dev'
		}
	]
};
