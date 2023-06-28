import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getUserRewardById, updateUserRewardById } from 'apiSdk/user-rewards';
import { Error } from 'components/error';
import { userRewardValidationSchema } from 'validationSchema/user-rewards';
import { UserRewardInterface } from 'interfaces/user-reward';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { SurveyInterface } from 'interfaces/survey';
import { getUsers } from 'apiSdk/users';
import { getSurveys } from 'apiSdk/surveys';

function UserRewardEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UserRewardInterface>(
    () => (id ? `/user-rewards/${id}` : null),
    () => getUserRewardById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UserRewardInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUserRewardById(id, values);
      mutate(updated);
      resetForm();
      router.push('/user-rewards');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<UserRewardInterface>({
    initialValues: data,
    validationSchema: userRewardValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit User Reward
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="points_earned" mb="4" isInvalid={!!formik.errors?.points_earned}>
              <FormLabel>Points Earned</FormLabel>
              <NumberInput
                name="points_earned"
                value={formik.values?.points_earned}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('points_earned', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.points_earned && <FormErrorMessage>{formik.errors?.points_earned}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<SurveyInterface>
              formik={formik}
              name={'survey_id'}
              label={'Select Survey'}
              placeholder={'Select Survey'}
              fetcher={getSurveys}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.title}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user_reward',
  operation: AccessOperationEnum.UPDATE,
})(UserRewardEditPage);
