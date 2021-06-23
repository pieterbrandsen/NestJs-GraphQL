import { GetStaticCountries } from '../../components/countries';

export default async (req, res) => {
  const countries = await (await GetStaticCountries()).countries;
  const results = req.query.q
    ? countries.filter((country) => country.name
      .toLowerCase()
      .includes(req.query.q.toLowerCase()))
    : [];
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};
