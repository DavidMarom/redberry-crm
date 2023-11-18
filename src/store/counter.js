import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 0,
  user: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  setUser: (user) => set(() => ({ user: user })),
  logoutUser: () => set(() => ({ user: null })),

}));

export default useCounterStore;
