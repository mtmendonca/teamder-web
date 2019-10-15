export type AuthenticatedUserContext = { token: string } | null;

export type KVList = { [key: string]: string };

export type Profile = {
  education: string;
  experience: string;
  role: string;
  skills: Skill[];
};

export type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  profile: Profile;
};

export type Skill = {
  name: string;
  level: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  venue: string;
  date: string;
  positions: Position[];
};

export type EventFormProps = {
  name: string;
  description: string;
  venue: string;
  date: Date | null;
};

export type Position = {
  id: string;
  name: string;
  company: string;
  location: string;
  description: string;
  experience: string;
  education: string;
  skills: Skill[];
};

export type PositionFormProps = {
  name: string;
  company: string;
  location: string;
  description: string;
  experience: string;
  education: string;
  skills: KVList;
};
