import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { userRewardValidationSchema } from 'validationSchema/user-rewards';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getUserRewards();
    case 'POST':
      return createUserReward();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUserRewards() {
    const data = await prisma.user_reward
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'user_reward'));
    return res.status(200).json(data);
  }

  async function createUserReward() {
    await userRewardValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.user_reward.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
