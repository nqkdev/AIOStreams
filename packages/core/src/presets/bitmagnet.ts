import { Option, UserData } from '../db/index.js';
import { Env, constants } from '../utils/index.js';
import { StremThruPreset } from './stremthru.js';
import { TorznabPreset } from './torznab.js';

export class BitmagnetPreset extends TorznabPreset {
  static override get METADATA() {
    const supportedResources = [constants.STREAM_RESOURCE];
    const options: Option[] = [
      {
        id: 'name',
        name: 'Name',
        description: 'What to call this addon',
        type: 'string',
        required: true,
        default: 'Bitmagnet',
      },
      {
        id: 'timeout',
        name: 'Timeout',
        description: 'The timeout for this addon',
        type: 'number',
        required: true,
        default: Env.BUILTIN_DEFAULT_BITMAGNET_TIMEOUT || Env.DEFAULT_TIMEOUT,
      },
      {
        id: 'services',
        name: 'Services',
        description:
          'Optionally override the services that are used. If not specified, then the services that are enabled and supported will be used.',
        type: 'multi-select',
        required: false,
        showInNoobMode: false,
        options: StremThruPreset.supportedServices.map((service) => ({
          value: service,
          label: constants.SERVICE_DETAILS[service].name,
        })),
        default: undefined,
        emptyIsUndefined: true,
      },
    ];

    return {
      ID: 'bitmagnet',
      NAME: 'Bitmagnet',
      LOGO: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/bitmagnet.png',
      URL: `${Env.INTERNAL_URL}/builtins/torznab`,
      TIMEOUT: Env.BUILTIN_DEFAULT_BITMAGNET_TIMEOUT || Env.DEFAULT_TIMEOUT,
      USER_AGENT: Env.DEFAULT_USER_AGENT,
      SUPPORTED_SERVICES: StremThruPreset.supportedServices,
      DESCRIPTION:
        'An addon to get debrid results from Bitmagnet, a self-hosted BitTorrent indexer and DHT crawler.',
      OPTIONS: options,
      SUPPORTED_STREAM_TYPES: [constants.DEBRID_STREAM_TYPE],
      SUPPORTED_RESOURCES: supportedResources,
      BUILTIN: true,
    };
  }

  protected static override generateManifestUrl(
    userData: UserData,
    services: constants.ServiceId[],
    options: Record<string, any>
  ): string {
    if (!Env.BUILTIN_BITMAGNET_URL) {
      throw new Error('The Bitmagnet URL is not set');
    }

    const config = {
      ...this.getBaseConfig(userData, services),
      url: `${Env.BUILTIN_BITMAGNET_URL.replace(/\/$/, '')}/torznab`,
      apiPath: '/api',
      forceQuerySearch: true,
    };

    const configString = this.base64EncodeJSON(config);
    return `${Env.INTERNAL_URL}/builtins/torznab/${configString}/manifest.json`;
  }
}
