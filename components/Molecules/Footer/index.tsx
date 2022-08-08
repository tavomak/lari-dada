import Image from 'next/image';

const Footer = () => (
  <footer className="container text-center">
    <a
      href="https://estelaestudio.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ul className="d-flex align-items-center justify-content-center">
        <li className="me-2">
          <span>
            Powered by
          </span>
        </li>
        <li>
          <span>
            <Image src="/estela.gif" alt="Estela estudio digital" width={34} height={34} />
          </span>
        </li>
      </ul>
    </a>
  </footer>
);

export default Footer;
