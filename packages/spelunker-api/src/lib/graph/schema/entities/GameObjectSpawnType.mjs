import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from '../../../graphql';

import GameObjectType from './GameObjectType';
import MapType from './MapType';

export default new GraphQLObjectType({
  name: 'GameObjectSpawn',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    x: { type: GraphQLFloat },
    y: { type: GraphQLFloat },
    z: { type: GraphQLFloat },
    orientation: { type: GraphQLFloat },

    object: { type: new GraphQLNonNull(GameObjectType) },
    map: { type: new GraphQLNonNull(MapType) },
  }),
});
