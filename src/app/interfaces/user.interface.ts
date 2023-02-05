export interface User {
  name: string,
  email: string,
  google?: boolean,
  img?: string,
  uid? :string,
  role?: string,
}

export interface GetUser {
  totalUsers: number,
  users: User[]
}