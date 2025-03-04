import styles from 'components/Header.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Header({ searchKeyword, setSearchKeyword }) {

    const [scrollY, setScrollY] = useState(200);
    const router = useRouter();

    useEffect(() => {
        if (router.route !== '/') return;
        setScrollY(window.scrollY);
        const onScroll = () => setScrollY(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setSearchKeyword(router.route === '/search' ? (router.query.q || '') : '');
    }, [router.query.q]);

    return <div className={styles.header} style={{
        background: scrollY <= 100 ? 'rgba(255, 255, 255, 0)' : 'rgb(255, 255, 255)',
        boxShadow: scrollY <= 100 ? 'rgb(238, 238, 238) 0 0 0 0' : 'rgb(238, 238, 238) 0 0.2vh 0 0',
    }}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a style={{
            color: scrollY <= 100 ? 'white' : 'black',
            textShadow: `rgba(0, 0, 0, 0.4) 0 0 ${scrollY <= 100 ? '0.2vw' : 0}`,
        }} href="/" className={styles.logo}>GAKNIME</a>

        <a className={styles.links + (scrollY <= 100 ? ' unscrolled' : ' scrolled')} style={{
            color: scrollY <= 100 ? 'white' : 'black',
            textShadow: `rgba(0, 0, 0, 0.2) 0 0 ${scrollY <= 100 ? '0.2vw' : 0}`,
        }} href="https://github.com/dytroInc/gaknime">소스코드</a>

        <input
            className={styles.search}
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            onKeyPress={event => {
                if (event.key === 'Enter' && searchKeyword.length > 0) {
                    router.push({ pathname: '/search', query: { q: searchKeyword } }).then(() => {
                        setScrollY(200);
                    });
                }
            }}
            placeholder="검색"
        />
    </div>;
}