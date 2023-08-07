import Link from "next/link";
import styles from "./page.module.scss";
import WhileInView from "@/app/components/framer/WhileInView";
import Image from "next/image";

const Famille = () => {
  return (
    <main className={styles.famille}>
      <WhileInView>
        <h1 className={styles.famille__h1}>Vie familiale</h1>
      </WhileInView>
      <div className={styles.famille__container}>
        <div className={styles.famille__article}>
          <WhileInView>
            <h2 className={styles.famille__article__h2}>
              Pourquoi faire du coaching familial ?
            </h2>
          </WhileInView>
          <div className={styles.famille__article__div}>
            <WhileInView className={styles.famille__article__div__text}>
              <div>
                <WhileInView>
                  <p>
                    Pour renforcer, améliorer et réparer les dynamiques opérant
                    au sein de la famille.
                    <br />
                    Vous êtes soumis au rythme effréné de la vie, au stress, à
                    la fatigue quotidienne, au tempérament imprévisible des
                    enfants et aux enjeux autour de la scolarité qui rendent
                    votre tâche de parent particulièrement délicate.
                  </p>
                </WhileInView>
              </div>
            </WhileInView>
            <div className={styles.famille__article__div__img}>
              <WhileInView>
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                  priority={true}
                  src={"/assets/img/famille.jpg"}
                  alt="bousole"
                />
              </WhileInView>
            </div>
          </div>
        </div>
        <div className={styles.famille__article}>
          <WhileInView>
            <h2 className={styles.famille__article__h2}>
              Comment tds-coachingdevie peut vous aider ?
            </h2>
          </WhileInView>
          <div className={styles.famille__article__div}>
            <div className={styles.famille__article__div__img}>
              <WhileInView>
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                  priority={true}
                  src={"/assets/img/famille.jpg"}
                  alt="bousole"
                />
              </WhileInView>
            </div>
            <WhileInView className={styles.famille__article__div__text}>
              <div>
                <WhileInView>
                  <ul>
                    <li>
                      Accompagner les parents isolés à devenir leader de leurs
                      enfants ;
                    </li>
                    <li>
                      Accompagner les parents à développer leurs qualités de
                      communication (Ecoute, compréhension, respect de chacun) ;
                    </li>
                    <li>
                      Coacher les femmes entrepreneures à équilibrer leur vie de
                      maman et leur vie professionnelle ;
                    </li>
                    <li>
                      Aider les parents à obtenir des relations complices avec
                      leurs enfants sans avoir à crier ni s’énerver ;
                    </li>
                    <li>
                      Aider les beaux-parents qui ne se sentent pas reconnus à
                      trouver leur place su sein de la famille recomposée ;
                    </li>
                    <li>
                      Aider les mamans hypersensibles à se sentir épanouies
                      malgré leurs émotions débordantes .
                    </li>
                  </ul>
                </WhileInView>
              </div>
            </WhileInView>
          </div>
        </div>
        <div className={styles.famille__article}>
          <WhileInView>
            <h2 className={styles.famille__article__h2}>
              Le coaching familial c’est :
            </h2>
          </WhileInView>
          <WhileInView>
            <ul className={styles.famille__article__ul}>
              <li>Des rencontres à domicile ou par vidéo ;</li>
              <li>
                Une rencontre d’évaluation, afin de bien cerner les besoins et
                l’origine des difficultés ;
              </li>
              <li>
                Une rencontre de clarification des objectifs, afin de prendre la
                bonne direction ;
              </li>
              <li>
                Une ou plusieurs rencontres afin d’aider la famille à bâtir et
                appliquer un plan d’action concret ;
              </li>
              <li>
                Une ou des rencontres d’observation et de coaching à travers le
                quotidien ;
              </li>
              <li>
                Une intervention basée sur les approches systémiques, approches
                orientées vers les solutions, le coaching et la programmation
                neurolinguistique (PNL) ;
              </li>
              <li>
                Une approche axée sur la responsabilisation de chaque membre de
                la famille, le développement du leadership éducatif des parents
                et des adultes qui guident l’enfant ;
              </li>
              <li>
                Une intervention positive et respectueuse qui se base sur les
                forces et les ressources de chacun ;
              </li>
              <li>
                Une formule épanouissante qui permet de retrouver le juste
                équilibre entre fermeté et bienveillance .
              </li>
            </ul>
          </WhileInView>
        </div>
        <div className={styles.famille__article}>
          <WhileInView>
            <p className={styles.famille__article__p__margin}>
              Si vous souhaitez en savoir plus sur la tarification, cliquez sur
              le bouton ci-dessous.
            </p>
          </WhileInView>
          <WhileInView>
            <p
              className={`${styles.famille__article__p} ${styles.famille__article__p__hover}`}
            >
              <Link className={styles.famille__article__btn} href="/tarif">
                Mes prestations
              </Link>
            </p>
          </WhileInView>
          <WhileInView>
            <p className={styles.famille__article__p}>
              Vous aimeriez que nous fassions un bout de chemin ensemble et que
              je vous accompagne afin de retrouver de l’harmonie et de la
              complicité au sein de votre famille ?
            </p>
          </WhileInView>
          <WhileInView>
            <p className={styles.famille__article__p}>
              Si vous souhaitez me contacter ou prendre rendez-vous, cliquez sur
              le bouton ci-dessous.
            </p>
          </WhileInView>
          <WhileInView>
            <p
              className={`${styles.famille__article__p} ${styles.famille__article__p__hover}`}
            >
              <Link className={styles.famille__article__btn} href="/contact">
                Prendre rendez-vous
              </Link>
            </p>
          </WhileInView>
        </div>
      </div>
    </main>
  );
};

export default Famille;
