import { UserInterface } from 'interfaces/user';
import { SurveyInterface } from 'interfaces/survey';
import { GetQueryInterface } from 'interfaces';

export interface UserRewardInterface {
  id?: string;
  user_id?: string;
  survey_id?: string;
  points_earned: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  survey?: SurveyInterface;
  _count?: {};
}

export interface UserRewardGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  survey_id?: string;
}
