const mapping: Record<string, string> = {
  'gift-cards': 'gift_card',
  organizations: 'organization',
  surveys: 'survey',
  users: 'user',
  'user-rewards': 'user_reward',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
