import * as yup from 'yup';

export const giftCardValidationSchema = yup.object().shape({
  name: yup.string().required(),
  points_required: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
