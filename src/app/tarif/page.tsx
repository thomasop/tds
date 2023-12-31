import Link from "next/link";
import WhileInView from "../components/framer/WhileInView";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "./components/Button";
import ButtonOpenDiscovery from "./components/ButtonOpenDiscovery";
import ButtonOpenNormal from "./components/ButtonOpenNormal";

const Tarif = () => {
  return (
    <>
      <noscript
        style={{
          width: "100%",
          padding: "20px 0",
          background: "red",
          position: "fixed",
          bottom: "0",
          left: "0",
          zIndex: "999",
          color: "white",
          textAlign: "center",
        }}
      >
        Veuillez activer JavaScript pour profiter pleinement de notre site.
      </noscript>
      <main className={styles.tarif}>
        <section className={styles.tarif__bg}>
          <Image
            className={styles.tarif__bg__img}
            width="0"
            height="0"
            sizes="100vw"
            priority={true}
            src={"/assets/img/avenue.jpg"}
            alt="bousole"
          />
        </section>
        <section className={styles.tarif__packs}>
          <div className={styles.tarif__packs__head}>
            <div className={styles.tarif__packs__head__left}>
              <h1 className={styles.tarif__packs__head__left__h1}>Tarifs</h1>
              <p className={styles.tarif__packs__head__left__p}>
                {" "}
                Explorez mes offres et packs conçus sur mesure pour les couples,
                les familles et les professionnels, afin de transformer
                positivement votre vie personnelle et professionnelle.
              </p>
              <p className={styles.tarif__packs__head__left__offer}>
                À l&apos;inscription vous aurez un rendez-vous de découverte
                offert (<ButtonOpenDiscovery />)
              </p>
            </div>

            <div className={styles.tarif__packs__head__right}>
              <Image
                className={styles.tarif__packs__head__right__img}
                width="0"
                height="0"
                sizes="100vw"
                priority={true}
                src={"/assets/img/moi.jpeg"}
                alt="bousole"
              />
              <p className={styles.tarif__packs__head__right__p}>
                Les séances sont assurées par Thierry Da Silva, coach
                professionnel certifié.
              </p>
            </div>
          </div>

          <div className={styles.tarif__packs__container}>
            {/* <div> */}
            <WhileInView
              type="y"
              className={`${styles.tarif__packs__container__card} ${styles.tarif__packs__container__card__unique}`}
            >
              <h2 className={styles.tarif__packs__container__card__h3}>
                Pack unique
              </h2>
              <ul className={styles.tarif__packs__container__card__ul}>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  1 séances de coaching (<ButtonOpenNormal />)
                </li>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  Sans engagement
                </li>
              </ul>
              <p className={styles.tarif__packs__container__card__price}>
                100
                <span
                  className={styles.tarif__packs__container__card__price__sign}
                >
                  €
                </span>
              </p>
              <div className={styles.tarif__packs__container__card__div}>
                <Button />
              </div>
            </WhileInView>
            <WhileInView
              type="y"
              className={`${styles.tarif__packs__container__card} ${styles.tarif__packs__container__card__flash}`}
            >
              <h2 className={styles.tarif__packs__container__card__h3}>
                Pack flash
              </h2>
              <ul className={styles.tarif__packs__container__card__ul}>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  3 séances de coaching (<ButtonOpenNormal />)
                </li>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  1 bilan final offert
                </li>
              </ul>
              <p className={styles.tarif__packs__container__card__price}>
                300
                <span
                  className={styles.tarif__packs__container__card__price__sign}
                >
                  €
                </span>
              </p>
              <div className={styles.tarif__packs__container__card__div}>
                <Button />
              </div>
            </WhileInView>
            {/* </div> */}

            <WhileInView
              type="y"
              className={`${styles.tarif__packs__container__card} ${styles.tarif__packs__container__card__long}`}
            >
              <h2 className={styles.tarif__packs__container__card__h3}>
                Pack sur mesure
              </h2>
              <ul className={styles.tarif__packs__container__card__ul}>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  Nombre de séances de coaching à définir (selon choix du client
                  et problématique abordée) (<ButtonOpenNormal />)
                </li>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  Points d’étape offerts (en fonction de la durée totale du
                  coaching)
                </li>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  1 bilan final offert
                </li>
                <li className={styles.tarif__packs__container__card__ul__li}>
                  <Image
                    className={
                      styles.tarif__packs__container__card__ul__li__icone
                    }
                    width="30"
                    height="30"
                    priority={true}
                    src={"/assets/icone/check-solid.svg"}
                    alt="bousole"
                  />
                  Prix sur demande
                </li>
              </ul>
              <div className={styles.tarif__packs__container__card__div}>
                <Button />
              </div>
            </WhileInView>
          </div>
        </section>
      </main>
    </>
  );
};

export default Tarif;
