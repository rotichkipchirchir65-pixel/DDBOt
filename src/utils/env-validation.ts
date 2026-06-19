/**
 * Environment variable validation utility
 * Ensures all required environment variables are set before the application starts
 */

interface ValidationError {
  missing: string[];
  warnings: string[];
}

const REQUIRED_ENV_VARS = [
  'TRANSLATIONS_CDN_URL',
  'R2_PROJECT_NAME',
  'CROWDIN_BRANCH_NAME',
  'APP_ENV',
  'REF_NAME',
];

const OPTIONAL_ENV_VARS = [
  'TRACKJS_TOKEN',
  'REMOTE_CONFIG_URL',
  'GD_CLIENT_ID',
  'GD_APP_ID',
  'GD_API_KEY',
  'DATADOG_SESSION_REPLAY_SAMPLE_RATE',
  'DATADOG_SESSION_SAMPLE_RATE',
  'DATADOG_APPLICATION_ID',
  'DATADOG_CLIENT_TOKEN',
  'RUDDERSTACK_KEY',
  'GROWTHBOOK_CLIENT_KEY',
  'GROWTHBOOK_DECRYPTION_KEY',
];

export function validateEnvironment(): ValidationError {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  REQUIRED_ENV_VARS.forEach((varName) => {
    const value = (process.env as Record<string, string | undefined>)[varName];
    if (!value || value.trim() === '') {
      missing.push(varName);
    }
  });

  // Check optional variables and warn if missing
  OPTIONAL_ENV_VARS.forEach((varName) => {
    const value = (process.env as Record<string, string | undefined>)[varName];
    if (!value || value.trim() === '') {
      warnings.push(varName);
    }
  });

  return { missing, warnings };
}

export function logEnvironmentValidation(): void {
  const validation = validateEnvironment();

  if (validation.missing.length > 0) {
    console.error(
      '[Environment] CRITICAL: Missing required environment variables:',
      validation.missing.join(', ')
    );
    console.error('[Environment] Please set these variables and restart the application.');
    console.error('[Environment] See .env.example for reference.');
  }

  if (validation.warnings.length > 0) {
    console.warn(
      '[Environment] WARNING: Some optional environment variables are not set:',
      validation.warnings.join(', ')
    );
    console.warn('[Environment] The application may not function properly.');
  }

  if (validation.missing.length === 0 && validation.warnings.length === 0) {
    console.log('[Environment] All environment variables are properly configured.');
  }
}

export function checkEnvironmentBeforeInit(): boolean {
  const validation = validateEnvironment();
  return validation.missing.length === 0;
}
