import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@components/Templates/Layout';
import styles from '@styles/pages/Home.module.scss';

const Home: NextPage = () => (
  <Layout
    title="Lari-Dada | Artista del movimiento"
    description="Lari-Dada es un espacio creado por Lorena Márquez desde el amor por el arte y el diseño, donde la creación es el eje principal."
  >
    <div className="row content-wrapper">
      <div className={`${styles.primaryBg} col-md-6`} style={{ background: 'url("/primaryBg.jpg")' }} />
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column">
          <h1 className={`display-font display-1 ${styles.primaryTitle}`}>
            <span className={`${styles.firstLetter}`} id="firstWord" data-content="Objetos decorativos">
              Objetos decorativos
              <br />
            </span>
            <span className={styles.secondLetter} id="secondWord" data-content="con amor y arte">
              con amor y arte
            </span>
          </h1>
          <p className={`mt-4 ${styles.bajada}`}>
            Espacio creado por Lorena Márquez desde el amor por el arte y el diseño,
            donde la creación es el eje principal.
          </p>
          <p className={` ${styles.bajada}`}>
            Creemos en el poder del color, en el espíritu que hay en la obra y
            cómo se transforma frente al espectador.
          </p>
          <Link href="/shop">
            <a href="#!" className="btn btn-primary mt-4 text-uppercase py-2 px-4 mb-4">Ir a la tienda</a>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default Home;
