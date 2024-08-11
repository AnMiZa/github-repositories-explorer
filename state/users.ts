import { atom } from 'jotai';
import { Repository, User } from '@/types';

export interface RepositoryState {
  id: number;
  repositories: Repository[];
}

export const usersAtom = atom<User[]>([]);
