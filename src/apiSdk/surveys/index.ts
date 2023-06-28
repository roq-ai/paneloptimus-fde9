import axios from 'axios';
import queryString from 'query-string';
import { SurveyInterface, SurveyGetQueryInterface } from 'interfaces/survey';
import { GetQueryInterface } from '../../interfaces';

export const getSurveys = async (query?: SurveyGetQueryInterface) => {
  const response = await axios.get(`/api/surveys${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSurvey = async (survey: SurveyInterface) => {
  const response = await axios.post('/api/surveys', survey);
  return response.data;
};

export const updateSurveyById = async (id: string, survey: SurveyInterface) => {
  const response = await axios.put(`/api/surveys/${id}`, survey);
  return response.data;
};

export const getSurveyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/surveys/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSurveyById = async (id: string) => {
  const response = await axios.delete(`/api/surveys/${id}`);
  return response.data;
};
