import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import { readdirSync, mkdirSync, writeFile } from 'fs';

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

export const CountryData = async ()=> {
  return `export const countries = ${JSON.stringify(await GetStaticCountries())}`
}

export const Execute = async () => {
  try {
    readdirSync('src/cache')
  } catch (e) {
    mkdirSync('src/cache')
  }

  writeFile('src/cache/data.js', await CountryData(), function (err) {
    if (err) return console.log(err);
    console.log('Countries cached.');
  })
}
export default Execute;
