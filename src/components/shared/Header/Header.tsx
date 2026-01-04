'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Archive, LayoutDashboard, LogOut } from 'lucide-react';
import './Header.scss';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isArchivePage = pathname === '/archives';

  const handleSignOut = async () => {
    console.log('[Header] Signing out');
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link href="/budgets" className="header__logo">
            <span className="header__logo-text">ExpenseTracker</span>
          </Link>

          <nav className="header__nav">
            <Link
              href={isArchivePage ? '/budgets' : '/archives'}
              className="header__nav-link"
            >
              {isArchivePage ? <LayoutDashboard size={18} /> : <Archive size={18} />}
              <span>{isArchivePage ? 'Budgets' : 'Archives'}</span>
            </Link>

            <div className="header__divider" />

            <div className="header__user">
              <span className="header__username">{session?.user?.name}</span>
              <button onClick={handleSignOut} className="header__signout" title="Sign out">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};