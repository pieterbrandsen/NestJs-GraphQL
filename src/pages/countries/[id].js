import Head from 'next/head';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { GetStaticCountries, GetStaticCountry } from '../../components/countries';
import styles from '../../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Country({ country }) {
  return (
    <div className={styles.container}>
    <Head>
        <title>{country.name}</title>
      </Head>
      <main className={styles.main}>
        <Card border="primary" style={{ width: '18rem' }}>
  <Card.Header>{country.name}</Card.Header>
  <Card.Body>
  <ListGroup variant="flush">
    <ListGroup.Item>Capital: {country.capital}</ListGroup.Item>
    <ListGroup.Item>Currency: {country.currency}</ListGroup.Item>
    <ListGroup.Item>Phone: {country.phone}</ListGroup.Item>
    <Button href="/" variant="primary">Go home</Button>
  </ListGroup>
  </Card.Body>
</Card>
      </main>
      </div>
  );
}

export async function getStaticPaths() {
  const paths = await (await GetStaticCountries()).countries.map((country) => ({
    params: {
      id: country.code,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const countryData = await GetStaticCountry(params.id.toString());
  return {
    props: {
      country: countryData.country,
    },
  };
}
