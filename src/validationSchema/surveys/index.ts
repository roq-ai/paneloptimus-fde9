import * as yup from 'yup';

export const surveyValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  reward_points: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
