import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const commonStore = atom({
  key: 'commonState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
