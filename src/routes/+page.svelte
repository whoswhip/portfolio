<script lang="ts">
	import { Mail, Globe, ChevronDown, ChevronUp, Heart, Info, Blocks } from '@lucide/svelte';
	import {
		SiGithub,
		SiPronounsdotpage,
		SiGitea,
		SiGit,
		SiX,
		SiLastdotfm
	} from '@icons-pack/svelte-simple-icons';
	import { browser } from '$app/environment';
	import { onDestroy, type Component } from 'svelte';
	import AboutMe from '$lib/AboutMe.svelte';
	import { slide } from 'svelte/transition';
	import { config } from '$lib/config';

	let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	let showProjects = true;
	let showCreditsTooltip = false;
	let hideCreditsTooltipTimeout: ReturnType<typeof setTimeout> | undefined;
	let clockInterval: ReturnType<typeof setInterval> | undefined;

	const getIcon = (socialId: string) => {
		const icons: Record<string, { component: Component; size: number }> = {
			github: { component: SiGithub, size: 18 },
			gitea: { component: SiGitea, size: 18 },
			x: { component: SiX, size: 18 },
			lastfm: { component: SiLastdotfm, size: 18 },
			email: { component: Mail, size: 18 }
		};
		return icons[socialId] || { component: SiGit, size: 18 };
	};

	const clearCreditsTooltipTimeout = () => {
		if (hideCreditsTooltipTimeout) {
			clearTimeout(hideCreditsTooltipTimeout);
			hideCreditsTooltipTimeout = undefined;
		}
	};

	const openCreditsTooltip = () => {
		clearCreditsTooltipTimeout();
		showCreditsTooltip = true;
	};

	const scheduleCloseCreditsTooltip = () => {
		clearCreditsTooltipTimeout();
		hideCreditsTooltipTimeout = setTimeout(() => {
			showCreditsTooltip = false;
			hideCreditsTooltipTimeout = undefined;
		}, 120);
	};

	const updateTime = () => {
		const now = new Date();
		const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
		const localtime = new Date(utc.getTime() + config.timezone * 3600000);
		time = localtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	if (browser) {
		updateTime();
		clockInterval = setInterval(updateTime, 6000);
	}

	onDestroy(() => {
		clearCreditsTooltipTimeout();
		if (clockInterval) {
			clearInterval(clockInterval);
		}
	});
</script>

<svelte:head>
	<title>{config.name}</title>
	<meta name="description" content={config.shortDescription} />

	<meta property="og:title" content={config.name} />
	<meta property="og:description" content={config.shortDescription} />
	{#if config.profilePicture}
		<meta property="og:image" content={config.profilePicture.url} />
	{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={config.name} />
	<meta name="twitter:description" content={config.shortDescription} />
	{#if config.profilePicture}
		<meta name="twitter:image" content={config.profilePicture.url} />
	{/if}
	<meta name="theme-color" content={config.primaryColor} />
</svelte:head>

<main class="flex min-h-[calc(100vh-9rem)] w-full flex-col gap-12 bg-black font-medium md:flex-row">
	<div class="flex w-full shrink-0 flex-col gap-2 md:max-w-75">
		{#if config.profilePicture}
			<div class="relative">
				<img
					src={config.profilePicture.url}
					alt={config.profilePicture.alt}
					class="aspect-square w-full rounded-md object-cover object-top"
				/>
				{#if config.profilePicture.credits}
					<div class="absolute right-2 bottom-2">
						<button
							class="rounded-full bg-black/50 p-1 text-neutral-400 transition-colors hover:bg-black/70 hover:text-neutral-300"
							on:mouseenter={openCreditsTooltip}
							on:mouseleave={scheduleCloseCreditsTooltip}
						>
							<Info size={14} />
						</button>
						{#if showCreditsTooltip}
							<div
								class="absolute right-0 bottom-full pb-2"
								role="tooltip"
								on:mouseenter={openCreditsTooltip}
								on:mouseleave={scheduleCloseCreditsTooltip}
							>
								<div
									class="w-max rounded border border-neutral-700/50 bg-neutral-800/50 px-2 py-1 text-xs text-neutral-300 backdrop-blur-sm"
								>
									{#if config.profilePicture.credits.url}
										<a
											href={config.profilePicture.credits.url}
											class="hover:underline"
											style="color: {config.primaryColor}"
										>
											{config.profilePicture.credits.name}
										</a>
									{:else}
										<span>{config.profilePicture.credits.name}</span>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
		<h1 class="cherry-bomb-one-regular text-5xl text-white">{config.name}</h1>
		<div class="mt-4 flex flex-col gap-2">
			<div class="flex w-full items-center gap-2 text-white">
				<span class="rounded-full" style="color: {config.primaryColor}">
					<SiPronounsdotpage size={18}></SiPronounsdotpage>
				</span>
				Pronouns
				<div class="ml-auto w-fit rounded-l-full rounded-r-full border border-neutral-600 px-2">
					<div class="flex flex-col">
						<span>{config.pronouns}</span>
					</div>
				</div>
			</div>
			<div class="flex w-full items-center gap-2 text-white">
				<span style="color: {config.primaryColor}">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-4.5"
					>
						<path
							fill-rule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				Timezone
				<div class="ml-auto w-fit rounded-l-full rounded-r-full border border-neutral-600 px-2">
					<div class="flex flex-col">
						<span>
							{time}
							•
							<span>
								UTC
								{config.timezone === 0 ? '' : (config.timezone > 0 ? '+' : '') + config.timezone}
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		{#if config.links && config.links.length > 0}
			<div class="mt-2 h-px w-full shrink-0 bg-neutral-600/50"></div>
			<div class="mt-4 flex flex-col gap-2">
				{#each config.links as link (link.id)}
					<a href={link.url}>
						<div class="flex w-full items-center gap-2 text-[16px] leading-6 text-white">
							<span style="color: {config.primaryColor}">
								<svelte:component this={getIcon(link.id).component} size={getIcon(link.id).size} />
							</span>
							{link.label}
							<span
								class="ml-auto rounded-l-full rounded-r-full border border-neutral-600 pr-2 pl-2 hover:brightness-150"
								style="color: {config.primaryColor}"
							>
								{link.display}
							</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
	<div class="mb-8 text-lg text-white">
		<div>
			<h1 class="mb-2 text-4xl">Hello!</h1>
			<AboutMe />
		</div>
		{#if config.projects && config.projects.length > 0}
			<div class="mt-4 h-px w-full shrink-0 bg-neutral-600/50"></div>
			<div>
				<div class="mt-2 flex justify-between">
					<h1 class="text-4xl">Projects</h1>
					<button
						class="p-1 hover:text-neutral-300"
						on:click={() => (showProjects = !showProjects)}
					>
						{#if showProjects}
							<ChevronUp size={32} />
						{:else}
							<ChevronDown size={32} />
						{/if}
					</button>
				</div>
				{#if showProjects}
					<div
						class="mt-6 flex flex-col gap-4 overflow-y-auto md:max-h-[calc(100vh-25rem)]"
						transition:slide={{ duration: 250 }}
					>
						{#each config.projects as project (project.id)}
							<div class="flex flex-col gap-2 rounded-md border border-neutral-600 p-4">
								<h2 class="text-2xl">{project.title}</h2>
								<p
									style="--primary: {config.primaryColor}"
									class="[&_a]:text-(--primary) [&_a:hover]:underline"
								>
									{@html project.description}
								</p>
								<div class="mt-2 flex flex-col gap-2">
									{#if project.gitUrl && project.gitProvider}
										<a
											href={project.gitUrl}
											class="flex items-center gap-2 hover:underline"
											style="color: {config.primaryColor}"
										>
											<span style="color: {config.primaryColor}">
												<svelte:component
													this={getIcon(project.gitProvider).component}
													size={getIcon(project.gitProvider).size}
												/>
											</span>
											View Source
										</a>
									{/if}
									{#if project.liveUrl}
										<a
											href={project.liveUrl}
											class="flex items-center gap-2 hover:underline"
											style="color: {config.primaryColor}"
										>
											<span style="color: {config.primaryColor}">
												<Globe size={18} />
											</span>
											Live Instance
										</a>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</main>
<footer class="w-full border-t border-neutral-600/50 pt-4 text-sm text-neutral-500">
	<div>
		<div class="flex items-center gap-1">
			<span class="text-red-400">
				<Heart fill="currentColor" size={16} />
			</span>
			Made by
			<a
				href="https://git.whoswhip.dev/whoswhip/portfolio"
				class="hover:underline"
				style="color: {config.primaryColor}">whoswhip</a
			>
		</div>

		<div class="flex items-center gap-1">
			<span style="color: {config.primaryColor}">
				<Blocks size={16} />
			</span>
			Built with
			<a href="https://svelte.dev" class="hover:underline" style="color: {config.primaryColor}"
				>Svelte</a
			> since 2026
		</div>

		<div class="flex items-center gap-1">
			<span style="color: {config.primaryColor}">
				<Globe size={16} />
			</span>
			Heavily inspired by
			<a href="https://shi.gg" class="hover:underline" style="color: {config.primaryColor}"
				>shi.gg</a
			>
		</div>
	</div>
</footer>
