import React from 'react';
import { VER } from '../data/constants';
import { UI } from '../data/uiStrings';
import type { Lang } from '../types';

export interface DispaccioFooterProps {
  lang: Lang;
}

export const DispaccioFooter: React.FC<DispaccioFooterProps> = ({ lang }) => {
  const u = UI[lang];

  return (
    <footer className="border-t border-surface-border py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
      <span>DISPACCIO &middot; {VER} &middot; {u.foot}</span>
    </footer>
  );
};
