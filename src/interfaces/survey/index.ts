import { UserRewardInterface } from 'interfaces/user-reward';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface SurveyInterface {
  id?: string;
  title: string;
  description?: string;
  reward_points: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  user_reward?: UserRewardInterface[];
  organization?: OrganizationInterface;
  _count?: {
    user_reward?: number;
  };
}

export interface SurveyGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  organization_id?: string;
}
