export interface Analytics {
	type: 'umami' | 'google-analytics';
	baseUrl: string;
	trackingId: string;
}
