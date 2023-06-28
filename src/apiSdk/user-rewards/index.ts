import axios from 'axios';
import queryString from 'query-string';
import { UserRewardInterface, UserRewardGetQueryInterface } from 'interfaces/user-reward';
import { GetQueryInterface } from '../../interfaces';

export const getUserRewards = async (query?: UserRewardGetQueryInterface) => {
  const response = await axios.get(`/api/user-rewards${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserReward = async (userReward: UserRewardInterface) => {
  const response = await axios.post('/api/user-rewards', userReward);
  return response.data;
};

export const updateUserRewardById = async (id: string, userReward: UserRewardInterface) => {
  const response = await axios.put(`/api/user-rewards/${id}`, userReward);
  return response.data;
};

export const getUserRewardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-rewards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserRewardById = async (id: string) => {
  const response = await axios.delete(`/api/user-rewards/${id}`);
  return response.data;
};
