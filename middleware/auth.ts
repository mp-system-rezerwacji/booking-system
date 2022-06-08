import { Middleware } from '@nuxt/types';

const authMiddleware: Middleware = ({ store, redirect, route }) => {
  if(!process.client) return;
  if(!store.state.user && route.path !== '/login') return redirect("/login");
  if(store.state.user && route.path === '/login') {
    return redirect('/');
  }
}

export default authMiddleware;
