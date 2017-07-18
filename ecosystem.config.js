module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'Weather-app',
      script: './server',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'deploy',
      host: '104.236.159.22',
      ref: 'origin/master',
      repo: 'git@github.com:tylercrosse/weather-app.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
