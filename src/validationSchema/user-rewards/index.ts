import * as yup from 'yup';

export const userRewardValidationSchema = yup.object().shape({
  points_earned: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  survey_id: yup.string().nullable(),
});
