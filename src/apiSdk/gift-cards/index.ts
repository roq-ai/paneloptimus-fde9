import axios from 'axios';
import queryString from 'query-string';
import { GiftCardInterface, GiftCardGetQueryInterface } from 'interfaces/gift-card';
import { GetQueryInterface } from '../../interfaces';

export const getGiftCards = async (query?: GiftCardGetQueryInterface) => {
  const response = await axios.get(`/api/gift-cards${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGiftCard = async (giftCard: GiftCardInterface) => {
  const response = await axios.post('/api/gift-cards', giftCard);
  return response.data;
};

export const updateGiftCardById = async (id: string, giftCard: GiftCardInterface) => {
  const response = await axios.put(`/api/gift-cards/${id}`, giftCard);
  return response.data;
};

export const getGiftCardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gift-cards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGiftCardById = async (id: string) => {
  const response = await axios.delete(`/api/gift-cards/${id}`);
  return response.data;
};
