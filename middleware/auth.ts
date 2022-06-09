import { Middleware } from '@nuxt/types';

const anonymousRoutes = ['/login', '/invite'];

const authMiddleware: Middleware = ({ store, redirect, route }) => {
  if(!process.client) return;

  if(!store.state.user && !anonymousRoutes.includes(route.path)) return redirect("/login");
  if(store.state.user && route.path === '/login') {
    return redirect('/');
  }
}

export default authMiddleware;
