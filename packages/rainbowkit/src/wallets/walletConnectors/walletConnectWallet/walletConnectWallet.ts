/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface WalletConnectWalletOptions {
  projectId?: string;
  chains: Chain[];
  options?: WalletConnectLegacyConnectorOptions | WalletConnectConnectorOptions;
}

export const walletConnectWallet = ({
  chains,
  options,
  projectId,
}: WalletConnectWalletOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: async () => (await import('./walletConnectWallet.svg')).default,
  iconBackground: '#3b99fc',
  createConnector: () => {
    const ios = isIOS();

    const connector = getWalletConnectConnector({
      version: '1',
      chains,
      options: {
        qrcode: ios,
        ...options,
      },
    });

    const getUri = async () =>
      (await (connector as WalletConnectLegacyConnector).getProvider())
        .connector.uri;

    return {
      connector,
      ...(ios
        ? {}
        : {
            mobile: { getUri },
            qrCode: { getUri },
          }),
    };
  },
});
