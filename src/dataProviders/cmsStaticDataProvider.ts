import CmsDataCache from '../common/cmsDataCache';
import { ICmsDataProvider } from './ICmsDataProvider';

export default class CmsStaticDataProvider implements ICmsDataProvider {
  private async _getData(filename: string) {
    return await (await fetch(CmsDataCache.cmsStaticDataLocation + '/' + filename)).json();
  }

  private _getDataSync(filename: string) {
    const request = new XMLHttpRequest();
    request.open('GET', CmsDataCache.cmsStaticDataLocation + '/' + filename, false);
    request.send(null);

    if (request.status === 200) {
      return JSON.parse(request.responseText);
    }
  }

  async getSingleAsset(assetId: number) {
    const data = await this._getData(assetId + '.json');
    CmsDataCache.set(assetId, data || {});
    return data;
  }

  getSingleAssetSync(assetId: number) {
    const data = this._getDataSync(assetId + '.json');
    CmsDataCache.set(assetId, data || {});
    return data;
  }

  async getCustomData(filename: string) {
    return await this._getData(filename);
  }

  getCustomDataSync(filename: string) {
    return this._getDataSync(filename);
  }
}
