<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/logo.png';
	import { config } from '$lib/config';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if config.analytics}
		{#if config.analytics.type === 'umami'}
			<script
				async
				defer
				data-website-id={config.analytics.trackingId}
				src={`${config.analytics.baseUrl}/umami.js`}
			></script>
		{:else if config.analytics.type === 'google-analytics'}
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.trackingId}`}
			></script>
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag() {
					dataLayer.push(arguments);
				}
				gtag('js', new Date());
				gtag('config', '{config.analytics.trackingId}');
			</script>
		{/if}
	{/if}
</svelte:head>
{@render children()}
