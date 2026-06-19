# DDBOt - Deriv Bot Builder

A powerful bot builder application for creating trading bots on the Deriv platform using Blockly visual programming and advanced trading features.

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

## Getting Started

### 1. Setup Environment Variables

First, create a `.env.local` file in the project root by copying from the example:

```bash
cp .env.example .env.local
```

Then, update `.env.local` with your actual configuration values. Required variables include:

- **Translation Service**: `TRANSLATIONS_CDN_URL`, `R2_PROJECT_NAME`, `CROWDIN_BRANCH_NAME`
- **Application**: `APP_ENV`, `REF_NAME`
- **Monitoring**: `DATADOG_APPLICATION_ID`, `DATADOG_CLIENT_TOKEN`
- **Analytics**: `RUDDERSTACK_KEY`
- **Feature Flags**: `GROWTHBOOK_CLIENT_KEY`, `GROWTHBOOK_DECRYPTION_KEY`
- **Google Drive**: `GD_CLIENT_ID`, `GD_APP_ID`, `GD_API_KEY` (optional)

See `.env.example` for all available options and detailed descriptions.

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

Run the development server with hot module replacement:

```bash
npm start
```

The application will be available at `http://localhost:8080` (or the configured port).

### 4. Building for Production

Generate an optimized production build:

```bash
npm run build
```

Analyze bundle size:

```bash
npm run build:analyze
```

Serve the production build locally:

```bash
npm run serve
```

## Project Structure

- `src/app/` - Application entry point and routing
- `src/pages/` - Route pages (dashboard, analysis tool, free bots, etc.)
- `src/components/` - Reusable React components
- `src/stores/` - MobX state management stores
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions and helpers
- `public/` - Static assets

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Watch mode for development
- `npm run serve` - Serve production build locally
- `npm test` - Run Jest tests
- `npm run coverage` - Generate test coverage report
- `npm run test:lint` - Run Prettier and ESLint
- `npm run test:fix` - Run Prettier and ESLint with auto-fix
- `npm run build:analyze` - Build with bundle size analysis

## Deployment

### Cloudflare Pages Deployment

To deploy to Cloudflare Pages, ensure the following GitHub Actions secrets are configured:

**Production Deployment:**
```
CLOUDFLARE_ACCOUNT_ID        # Your Cloudflare account ID
CLOUDFLARE_API_TOKEN         # Cloudflare API token with Pages access
CLOUDFLARE_PROJECT_NAME      # Name of the Cloudflare Pages project
```

**Preview Deployments (Test Links):**
```
CLOUDFLARE_ACCOUNT_ID        # Your Cloudflare account ID
CLOUDFLARE_TEST_LINK_TOKEN   # Separate token for test deployments
CLOUDFLARE_PROJECT_NAME      # Cloudflare Pages project name
```

### Environment Configuration for Deployment

Ensure all environment variables listed in `.env.example` are configured:

- **Production**: Set in Cloudflare Pages project settings
- **Staging**: Set in GitHub secrets for staging workflow
- **Development**: Set in local `.env.local`

### Slack Notifications

To receive notifications on Slack when builds are triggered, add this GitHub Actions secret:

```
SLACK_WEBHOOK    # Slack webhook URL for build notifications
```

## Troubleshooting

### Environment Variables Not Loading

If the app fails to start with missing environment variable errors:

1. Check that `.env.local` exists in the project root
2. Verify all required variables from `.env.example` are set
3. Restart the development server after making changes
4. Check browser console and terminal for validation messages

### Build Failures

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (requires 20.x or higher)
- Review build errors in console output carefully

### Port Already in Use

If the default port is in use:
- Edit `package.json` start script to use a different port
- Or kill the process using the current port

## Security

### Dependency Vulnerabilities

Regularly check for security vulnerabilities:

```bash
npm audit
npm audit fix
```

Keep dependencies up to date and review security advisories carefully.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test thoroughly
3. Run linting and tests: `npm run test:fix && npm test`
4. Commit with descriptive messages
5. Push and create a pull request

## License

Proprietary - Deriv Limited
