import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './search.module.css';

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (q) => `/api/search?q=${q}`;

  const onChange = useCallback((event) => {
    const eventQuery = event.target.value;
    setQuery(eventQuery);
    if (eventQuery.length) {
      fetch(searchEndpoint(eventQuery))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener('click', onClick);
  }, []);

  return (
    <div
      className={styles.container}
      ref={searchRef}
    >
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder='Type to search'
        type='text'
        value={query}
      />
      { active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ code, name }) => (
            <li className={styles.result} key={code}>
              <Link href="/countries/[code]" as={`/countries/${code}`}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) }
    </div>
  );
}
