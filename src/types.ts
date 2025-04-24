export type List = {
  _id: string,
  name: string,
  description: string,
  tiers: Tier[],
  user: User,
}

type Tier = {
  _id: string,
  name: string,
  color: string,
  order: number,
}

type User = {
  _id: string,
  username: string,
}