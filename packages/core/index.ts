import { makeInstaller } from '@sunlit-ui/utils';
import components from './components';
import '@sunlit-ui/theme/index.css';

const installer = makeInstaller(components);

export * from '@sunlit-ui/components';

export default installer;
