const graphql = require('graphql');
const POKEMONS = require('../data/pokedex.json');
const TYPES = require('../data/types.json');

const {GraphQLObjectType , GraphQLSchema ,GraphQLString, GraphQLInt ,GraphQLList, GraphQLNonNull} =graphql;

const PokemonNameType = new GraphQLObjectType({
    name: 'PokemonName',
    description: 'Names of the Pokemon in different languages',
    fields: () => ({
      english: { type: new GraphQLNonNull(GraphQLString) },
      japanese: { type: new GraphQLNonNull(GraphQLString) },
      chinese: { type: new GraphQLNonNull(GraphQLString) },
      french: { type: new GraphQLNonNull(GraphQLString) }
    })
  });
  
  const PokemonBaseStatsType = new GraphQLObjectType({
    name: 'PokemonBaseStats',
    description: 'Base stats of the Pokemon',
    fields: () => ({
      HP: { type: new GraphQLNonNull(GraphQLInt) },
      Attack: { type: new GraphQLNonNull(GraphQLInt) },
      Defense: { type: new GraphQLNonNull(GraphQLInt) },
      spAttack: { 
        type: new GraphQLNonNull(GraphQLInt),
        resolve: (parent) => {
          return parent["Sp. Attack"];
        }
       },
      spDefense: { 
        type: new GraphQLNonNull(GraphQLInt),
        resolve: (parent) => {
          return parent["Sp. Defense"];
        } 
      },
      Speed: { type: new GraphQLNonNull(GraphQLInt) }
    })
  });
  
  const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    description: 'This represents a Pokemon',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(PokemonNameType) },  // Nested fields for name
      type: { type: new GraphQLList(GraphQLString) },
      base: { type: new GraphQLNonNull(PokemonBaseStatsType) }  // Nested fields for base stats
    })
  });

  const PokemonTypeType = new GraphQLObjectType({
    name: 'PokemonType',
    description: 'This represents the type of a Pokemon',
    fields: () => ({
      english: { type: new GraphQLNonNull(GraphQLString) },
      chinese: { type: new GraphQLNonNull(GraphQLString) },
      japanese: { type: new GraphQLNonNull(GraphQLString) },
      effective: { type: new GraphQLList(GraphQLString) },  // Nested fields for effective types
      ineffective: { type: new GraphQLList(GraphQLString) }, // Nested fields for ineffective types
      no_effect : { type: new GraphQLList(GraphQLString) }, // Nested fields for noneffective types
    })
  });
  

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: () => ({
        pokemons:{
            type: new GraphQLList(PokemonType),
            description: 'All pokemons',
            resolve: () => POKEMONS
          },
        pokemon:{
            type: PokemonType,
            description: 'A single pokemon',
            args: {
                id: { type : GraphQLInt }
            },
            resolve: (parent, args) => POKEMONS.find(pokemon => pokemon.id === args.id)
        },
        types:{
          type: new GraphQLList(PokemonTypeType),
          description: 'All pokemon types',
          resolve: () => TYPES
        },
        type:{
          type: new GraphQLList(PokemonTypeType),
          description: 'A single type',
          args: {
              name: { type : new GraphQLList(GraphQLString)}
          },
          resolve: (parent, args) => TYPES.filter(type => args.name.includes(type.english))
      },
        })
})


module.exports = new GraphQLSchema({
    query: RootQueryType
})

