import { AuthGuard } from '../../modules/shared/components/AuthGuard';
import { HomeIndex } from './pages';
import { Dashboard } from './pages/Dashboard';

export const HomeRouter = {
  path: '/home',
  Component: () => (
    <AuthGuard redirect={'/auth/login'}>
      <HomeIndex></HomeIndex>
    </AuthGuard>
  ),
  children: [{ path: 'dashboard', Component: Dashboard }],
};
