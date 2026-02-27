This is a simple portfolio page heavily inspired by [shi-gg/portfolio](https://github.com/shi-gg/portfolio).
At least a little bit of knowledge on svelte/html/typescript is required if you want to do extra configuration such as adding extra icons.

## Configuration

Essentially all configuration is managed through the `config` object in [src/routes/+page.svelte](src/routes/+page.svelte).

### Basic Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Your display name |
| `title` | `string` | No | Custom page title (defaults to `name` if omitted) |
| `shortDescription` | `string` | No | Brief bio shown in embeds and meta tags |
| `pronouns` | `string` | Yes | Your preferred pronouns |
| `timezone` | `number` | Yes | Hours offset from UTC (e.g., `-5` for EST, `1` for CET) |
| `primaryColor` | `string` | Yes | Theme color in any CSS format (`#b49068`, `rgb(180, 144, 104)`, etc.) |

### Profile Picture

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `profilePicture.url` | `string` | Yes* | Path or URL to your profile picture (e.g., `/pfp.jpg`) |
| `profilePicture.alt` | `string` | Yes* | Alt text describing the image |
| `profilePicture.credits.name` | `string` | No | Credit attribution name |
| `profilePicture.credits.url` | `string` | No | Link to credit source or creator |

> The entire `profilePicture` object is optional.

### Socials

Array of social media links. Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (determines icon: `github`, `gitea`, `x`, `lastfm`, `email`) |
| `label` | `string` | Yes | Display label (e.g., "GitHub") |
| `url` | `string` | Yes | Full URL or `mailto:` link |
| `display` | `string` | Yes | Username or display text shown to users |

### Projects

Array of project showcases. Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `title` | `string` | Yes | Project name |
| `description` | `string` | Yes | Brief project description |
| `gitProvider` | `string` | Yes | Git provider for icon (`github`, `gitea`, etc.) |
| `gitUrl` | `string` | Yes | Repository URL |
| `liveUrl` | `string` | No | Production/demo URL |

### About Me Content

Your bio/about section is managed in [src/lib/AboutMe.svelte](src/lib/AboutMe.svelte) as a separate component to allow full customization.

**What you can customize:**
- Full HTML/Svelte markup support
- Dynamic content with TypeScript logic (e.g., calculating years of experience)
- Custom styling, bold text, links, lists, etc.
- Component imports if needed

**Example from the default component:**
```html
<script lang="ts">
  const startYear = 2022;
  const yearsCoding = new Date().getFullYear() - startYear;
</script>

<p>
  I've been coding for around {yearsCoding} years...
</p>
```

Edit this file to write your own introduction, experiences, interests, or any other content you want to display.

### Example Configuration

```typescript
let config: Configuration = {
  name: 'whoswhip',
  shortDescription: "I'm a full stack developer, mainly working with C#.",
  profilePicture: {
    url: '/pfp.jpg',
    alt: 'Picture of an orange sunset',
    credits: {
      name: 'whoswhip',
      url: 'https://example.com'
    }
  },
  primaryColor: '#b49068',
  pronouns: 'He/Him',
  timezone: -5,
  socials: [
    {
      id: 'github',
      label: 'Github',
      url: 'https://github.com/whoswhip',
      display: 'whoswhip'
    }
  ],
  projects: [
    {
      id: 'sharpbin',
      title: 'Sharpbin',
      description: 'A pastebin-esque website with syntax highlighting.',
      gitProvider: 'github',
      gitUrl: 'https://github.com/whoswhip/sharpbin',
      liveUrl: 'https://sharpbin.cc'
    }
  ]
};
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The site will be available at `http://localhost:5173` with hot module replacement enabled.

### Build & Preview

To test a production build locally:

```bash
bun run build
bun run preview
```

## Hosting

### Docker Deployment (Recommended)

The project includes Docker configuration for easy deployment with Nginx serving the static build.

#### Quick Start

```bash
docker compose up -d
```

The portfolio will be accessible at `http://localhost:3000`.

#### Custom Port

Edit `docker-compose.yml` or use environment variables:

```bash
PORT=8080 docker compose up -d
```

#### Rebuild After Changes

```bash
docker compose up -d --build
```

### Manual Deployment

For manual deployment to any static hosting provider:

1. **Build the static site:**
```bash
bun install
bun run build
```

2. **Deploy the `build` folder** to your hosting provider:
   - Vercel, Netlify, Cloudflare Pages, etc.
   - Any static file server (Nginx, Apache, etc.)
   - CDN providers

#### Example: Deploy to Nginx

```bash
# Build the project
bun run build

# Copy to web root
sudo cp -r .svelte-kit/output/* /var/www/html/

# Configure Nginx (example)
sudo cp nginx.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```
