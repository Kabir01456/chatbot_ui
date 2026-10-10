import type { LanguageCode, Translations } from '../types';
import { en } from './en';
import { hi } from './hi';
import { bn } from './bn';
import { ta } from './ta';
import { te } from './te';
import { gu } from './gu';
import { mr } from './mr';
import { kn } from './kn';
import { ml } from './ml';
import { pa } from './pa';
import { oriya } from './or';
import { assamese } from './as';
import { ur } from './ur';
import { ne } from './ne';
import { sa } from './sa';
import { mai } from './mai';
import { kok } from './kok';
import { brx } from './brx';
import { doi } from './doi';
import { ksDeva } from './ks-Deva';
import { ksArab } from './ks-Arab';
import { mniBeng } from './mni-Beng';
import { mniMtei } from './mni-Mtei';
import { sat } from './sat';
import { sdDeva } from './sd-Deva';
import { sdArab } from './sd-Arab';

export const translations: Record<LanguageCode, Translations> = {
  en, hi, bn, ta, te, gu, mr, kn, ml, pa, or: oriya, as: assamese, ur,
  ne, sa, mai, kok, brx, doi,
  'ks-Deva': ksDeva, 'ks-Arab': ksArab,
  'mni-Beng': mniBeng, 'mni-Mtei': mniMtei,
  sat, 'sd-Deva': sdDeva, 'sd-Arab': sdArab,
};