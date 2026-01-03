'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { HEADER_LABELS } from './Header.constants';
import './Header.scss';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isArchivePage = pathname === '/archives';

  const handleSignOut = async () => {
    console.log('[Header] Signing out user');
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('[Header] Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header__container container">
        <Link href="/budgets" className="header__logo">
          {HEADER_LABELS.LOGO}
        </Link>

        <div className="header__actions">
          <Link
            href={isArchivePage ? '/budgets' : '/archives'}
            className="header__link"
            title={isArchivePage ? HEADER_LABELS.BUDGETS : HEADER_LABELS.ARCHIVES}
          >
            {isArchivePage ? HEADER_LABELS.BUDGETS : HEADER_LABELS.ARCHIVES}
          </Link>

          <div className="header__user">
            <span className="header__user-name">{session?.user?.name}</span>
            <button
              type="button"
              title={HEADER_LABELS.SIGN_OUT}
              onClick={handleSignOut}
              className="header__sign-out"
            >
              {HEADER_LABELS.SIGN_OUT}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};