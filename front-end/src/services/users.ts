import axios from 'axios';
import { User } from '../types/User';

const getAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    return response.data as Promise<User[]>;
  } catch (e: unknown) {
    console.log((e as Error).message);
    return [];
  }
}

export { getAllUsers };