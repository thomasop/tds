import WhileInView from "@/app/components/framer/WhileInView";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";

const Couple = () => {
  return (
    <main className={styles.couple}>
      <section className={styles.couple__bg}>
        <Image
          className={styles.couple__bg__img}
          width="0"
          height="400"
          sizes="100vw"
          priority={true}
          src={"/assets/img/avenue.jpg"}
          alt="bousole"
        />
      </section>
      <section className={styles.couple__why}>
        <div className={styles.couple__why__container}>
          <WhileInView>
            <h2 className={styles.couple__why__container__h2}>Vie de couple</h2>
          </WhileInView>
          <div className={styles.couple__why__container__content}>
            <WhileInView
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <h2 className={styles.couple__why__container__content__h2}>
                Pourquoi faire du coaching familial ?
              </h2>
              <div>
                <p>
                  Le couple est l’espace où chacun laisse éclore ce qu’il a de
                  plus fragile et délicat. Il est le territoire où nous pouvons
                  révéler sans crainte nos faiblesses comme nos forces.
                </p>
                <p>
                  Tous les couples, à un moment ou à un autre, vivent des
                  moments agréables et des moments plus difficiles. Lors de ces
                  moments d’impasses ou de défis, certains couples décident soit
                  de :
                </p>
                <ul className={styles.couple__why__container__content__ul}>
                  <li>Se séparer ;</li>
                  <li>Continuer à lutter l’un contre l’autre ;</li>
                  <li>
                    Se résigner et « vivre avec la situation » sans jamais rien
                    régler ;
                  </li>
                  <li>Traverser l’impasse pour en sortir encore plus fort .</li>
                </ul>
              </div>
            </WhileInView>
            <WhileInView style={{ display: "flex", marginLeft: "80px" }}>
              <Image
                className={styles.couple__why__container__content__img}
                width="400"
                height="400"
                sizes="100vw"
                priority={true}
                src={"/assets/img/couple.jpg"}
                alt="bousole"
              />
            </WhileInView>
          </div>
          <p>
            Les couples qui souhaitent vivre une vie amoureuse épanouie, saine
            et équilibrée choisissent de faire face à leur situation et de
            traverser l’impasse pour en sortir encore plus fort. L’un des moyens
            privilégiés des couples pour avoir l’aide ou l’accompagnement
            nécessaire aux changements souhaités est d’avoir recours à un coach
            conjugal.
          </p>
        </div>
      </section>
      <div className={styles.couple__container}>
        <div className={styles.couple__article}>
          <WhileInView>
            <h2 className={styles.couple__article__h2}>
              Comment tds-coachingdevie peut vous aider ?
            </h2>
          </WhileInView>
          <WhileInView>
            <div className={styles.couple__article__div__big}>
              <p>
                Un couple est la réunion de deux personnes qui ont chacune une
                histoire, des valeurs, des croyances, des envies qui leur sont
                propres. La rencontre de ces deux cultures nécessite un partage,
                des ajustements, des concessions de part et d’autre. Ce travail
                n’est pas toujours simple à réaliser.
              </p>
              <ul>
                <li>
                  Accompagner le couple pour que chaque conjoint soit
                  bienveillant envers l’autre – Aider à créer de l’harmonie dans
                  le couple ;
                </li>
                <li>
                  Accompagner le couple pour amener les conjoints à mieux
                  communiquer (éviter les ruptures de dialogue, les
                  incompréhensions et le mal-être) ;
                </li>
                <li>
                  Coacher le couple pour solutionner les problématiques de
                  tension, stress, disputes et frustrations ;
                </li>
                <li>
                  Gérer les difficultés au sein d’une famille recomposée ;
                </li>
                <li>
                  Accompagnement des couples en difficultés avec les enfants ;
                </li>
                <li>
                  Gérer les difficultés liées aux changements de vie
                  (déménagement, situation professionnelle, …) .
                </li>
              </ul>
            </div>
          </WhileInView>
        </div>
        <div className={styles.couple__article}>
          <WhileInView>
            <p className={styles.couple__article__p__margin}>
              Si vous souhaitez en savoir plus sur la tarification, cliquez sur
              le bouton ci-dessous.
            </p>
          </WhileInView>
          <WhileInView>
            <p
              className={`${styles.couple__article__p} ${styles.couple__article__p__hover}`}
            >
              <a className={styles.couple__article__btn} href="/tarif">
                Mes prestations
              </a>
            </p>
          </WhileInView>
          <WhileInView>
            <p className={styles.couple__article__p}>
              Vous aimeriez que nous fassions un bout de chemin ensemble et que
              je vous accompagne afin de retrouver de l’harmonie et de la
              complicité entre vous ?
            </p>
          </WhileInView>
          <WhileInView>
            <p className={styles.couple__article__p}>
              Si vous souhaitez me contacter ou prendre rendez-vous, cliquez sur
              le bouton ci-dessous.
            </p>
          </WhileInView>
          <WhileInView>
            <p
              className={`${styles.couple__article__p} ${styles.couple__article__p__hover}`}
            >
              <a className={styles.couple__article__btn} href="/contact">
                Prendre rendez-vous
              </a>
            </p>
          </WhileInView>
          <WhileInView>
            <div
              className={`${styles.couple__article__div__big} ${styles.couple__article__div__big__margin}`}
            >
              <p>Modalités des séances de coaching conjugal :</p>
              <ul className={styles.couple__article__div__big__padding}>
                <li>
                  Le coaching de couple se fait en présentiel pour les premières
                  séances ;
                </li>
                <li>
                  Certaines séances sont réalisées en couple et d’autres en
                  individuel ;
                </li>
                <li>
                  Il implique la présence et la volonté de chaque membre de
                  bénéficier d’un coaching de couple .
                </li>
              </ul>
            </div>
          </WhileInView>
        </div>
      </div>
      <section className={styles.couple__delivery}>
        <div className={styles.couple__delivery__container}>
          <div className={styles.couple__delivery__container__card}>
            <h3 className={styles.couple__delivery__container__card__h3}>
              Mes prestations
            </h3>
            <Image
              className={styles.couple__delivery__container__card__img}
              width="30"
              height="30"
              priority={true}
              src={"/assets/icone/goal.png"}
              alt="bousole"
            />
            <p className={styles.couple__delivery__container__card__p}>
              Si vous souhaitez en savoir plus sur la tarification, cliquez sur
              le bouton ci-dessous.
            </p>
            <Link
              className={styles.couple__delivery__container__card__btn}
              href="/tarif"
            >
              Mes prestations
            </Link>
          </div>
          <div className={styles.couple__delivery__container__card}>
            <h3 className={styles.couple__delivery__container__card__h3}>
              Rendez-vous
            </h3>
            <Image
              className={styles.couple__delivery__container__card__img}
              width="30"
              height="30"
              priority={true}
              src={"/assets/icone/goal.png"}
              alt="bousole"
            />
            <p className={styles.couple__delivery__container__card__p}>
              Si vous souhaitez me contacter ou prendre rendez-vous, cliquez sur
              le bouton ci-dessous.
            </p>
            <Link
              className={styles.couple__delivery__container__card__btn}
              href="/contact"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Couple;
