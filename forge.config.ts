import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import { port, httpUrl, wsUrl } from './client/config';

import copyApiFolder from './electron/buildScripts/copyApiFolder';

const config: ForgeConfig = {
  packagerConfig: {
    afterExtract: [
      copyApiFolder
    ],
    icon: './client/assets/icons/icon'
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      iconUrl: './client/assets/icons/icon',
      setupIcon: './client/assets/icons/icon'
    }), 
    new MakerZIP({}, ['darwin']), 
    new MakerRpm({}), 
    new MakerDeb({
      options: {
        icon: './client/assets/icons/icon'
      } 
    }),
    {
      name: '@rabbitholesyndrome/electron-forge-maker-portable',
      config: {
        iconUrl: './client/assets/icons/icon',
        portable: {
          artifactName: 'SPP Extras'
        }
      }
    }
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: `connect-src 'self' ${httpUrl}:${port} ${wsUrl}:${port} 'unsafe-eval'`,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './electron/splash/prod-splash.html',
            js: './electron/splash/renderer.ts',
            name: 'splash_window',
          },
          {
            html: './client/index.html',
            js: './electron/renderer.ts',
            name: 'main_window',
            preload: {
              js: './electron/preload.ts'
            }
          }
        ]
      }
    })
  ]
};

export default config;
