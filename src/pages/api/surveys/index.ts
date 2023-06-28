import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { surveyValidationSchema } from 'validationSchema/surveys';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSurveys();
    case 'POST':
      return createSurvey();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSurveys() {
    const data = await prisma.survey
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'survey'));
    return res.status(200).json(data);
  }

  async function createSurvey() {
    await surveyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.user_reward?.length > 0) {
      const create_user_reward = body.user_reward;
      body.user_reward = {
        create: create_user_reward,
      };
    } else {
      delete body.user_reward;
    }
    const data = await prisma.survey.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
