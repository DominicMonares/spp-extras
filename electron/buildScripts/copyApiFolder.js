// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function (extractPath, electronVersion, platform, arch, done) {
  console.log({ extractPath });
  fs.copy('./api/dist/spp_extras_api', path.join(extractPath, 'api'), () => {

    console.log('Finished Copy Python Folder');
    done();
  });
}
