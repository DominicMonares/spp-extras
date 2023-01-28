import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import { port, url } from './client/config';

import copyApiFolder from './electron/buildScripts/copyApiFolder';

const config: ForgeConfig = {
  packagerConfig: {
    afterExtract: [
      copyApiFolder
    ]
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}), 
    new MakerZIP({}, ['darwin']), 
    new MakerRpm({}), 
    new MakerDeb({}),
    {
      name: '@rabbitholesyndrome/electron-forge-maker-portable',
      config: {
        portable: {
          artifactName: 'SPP Extras'
        }
      }
    }
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: `connect-src 'self' ${url}:${port} 'unsafe-eval'`,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './client/index.html',
            js: './electron/renderer.ts',
            name: 'main_window',
            preload: {
              js: './electron/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
