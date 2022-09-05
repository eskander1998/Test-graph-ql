const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Ville {
    nom: String
    superficie: Int
    nombreDhabitant: Int
    nomDuMaire: String
    departement: String
  }
  type Query {
    ville: [Ville]
    villeByName(nom: String!): Ville
    villeByDepartement(departement: String!): [Ville]
  }
  type Mutation {
    addVille(
      nom: String
      superficie: Int
      nombreDhabitant: Int
      nomDuMaire: String
      departement: String
    ): Ville
  }
`;

const ville = [
  {
    nom: "Paris",
    superficie: 110000,
    nombreDhabitant: 1000,
    nomDuMaire: "eskander",
    departement: "ile de france",
  },
  {
    nom: "Lyon",
    superficie: 200000,
    nombreDhabitant: 10000,
    nomDuMaire: "jean",
    departement: "Rhone alpes",
  },
  {
    nom: "Saint-Étienne",
    superficie: 30000,
    nombreDhabitant: 10000,
    nomDuMaire: "Marc",
    departement: "Rhone alpes",
  },
];

const resolvers = {
  Query: {
    ville: () => ville,
    villeByName(parent, args, context, info) {
      return ville.find((ville) => ville.nom === args.nom);
    },
    villeByDepartement(parent, args, context, info) {
      return ville.filter((ville) => ville.departement === args.departement);
    },
  },
};

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
