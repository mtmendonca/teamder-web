import { MockList } from 'graphql-tools';
import faker from 'faker';
import { getUnixTime } from 'date-fns';

const Skill = () => ({
  __typenanme: 'Skill',
  name: faker.random.word(),
  level: faker.random.word(),
});

const Event = () => ({
  __typenanme: 'Event',
  id: faker.random.alphaNumeric(16),
  name: faker.random.words(3),
  description: faker.lorem.sentence(3),
  date: String(getUnixTime(faker.date.recent(5))),
  venue: faker.random.word(),
});

const Position = () => ({
  name: faker.random.word(),
  company: faker.random.word(),
  location: faker.random.word(),
  description: faker.random.word(),
  experience: faker.random.word(),
  education: faker.random.word(),
});

export default {
  Event,
  Skill,
  Position,
  Query: () => ({
    events: () => new MockList(10, Event),
  }),
};
