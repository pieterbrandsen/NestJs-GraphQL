import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';

export const GetStaticCountries = async () => {
    const client = new ApolloClient({
      uri: 'http://countries.trevorblades.com/',
      link: new HttpLink({uri: 'http://countries.trevorblades.com',fetch}),
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: gql`
      query {
        countries {
          name,
          code,
          capital,
        }
      }
      `,
    });

    return {countries	: data.countries};
  }

  export const GetStaticCountry = async(code) => {
    const client = new ApolloClient({
      uri: 'http://countries.trevorblades.com/',
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: gql`
      query($code: ID!) {
        country(code: $code) {
          name,
          code,
          capital,
          currency
          phone
        }
      }
      `, variables: {code}
    });

    return {country	: data.country};
  }