
import { MutationTree } from 'vuex'
import { User } from '@firebase/auth';

interface AppUser {
  uid: string;
  email: string;
  verified: boolean;
}

export const state = () => ({
  user: null as AppUser | null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser) {
      state.user = {
        uid: authUser.uid,
        email: authUser.email,
        verified: claims.verified,
      }
    } else {
      state.user = null
    }
  },
}
