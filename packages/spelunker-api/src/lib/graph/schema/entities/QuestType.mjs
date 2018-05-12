import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from '../../../graphql';

import CollectionType from '../CollectionType';

import GameObjectType from './GameObjectType';
import NPCType from './NPCType';

export default new GraphQLObjectType({
  name: 'Quest',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },

    endedBy: CollectionType.definitionFor(NPCType),
    endedByObject: CollectionType.definitionFor(GameObjectType),
    startedBy: CollectionType.definitionFor(NPCType),
    startedByObject: CollectionType.definitionFor(GameObjectType),
  }),
});
