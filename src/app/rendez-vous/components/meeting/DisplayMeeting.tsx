import React, { useEffect } from "react";
import styles from "../../page.module.scss";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUserGet from "@/app/components/hook/user/useUserGet";
import fetchGetPaymentValid from "@/app/components/fetch/paiement/fetchGetPaymentValid";
import fetchPost from "@/app/components/fetch/user/FetchPost";

const DisplayMeeting = () => {
  const { userData } = useUserGet();
  const dispatch = useDispatch<AppDispatch>();
  const { trigger, data } = useSWRMutation(
    "/api/paiement/getValid",
    fetchGetPaymentValid
  );
  useEffect(() => {
    if (data) {
      window.location.href = data.url;
    }
  }, [data, dispatch]);

  const { trigger: triggerEdit, data: dataEdit } = useSWRMutation(
    "/api/user/editFormuleUser",
    fetchPost
  );
  const { push } = useRouter();
  let restDate;
  if (userData?.body.meeting && userData?.body.meeting.limitDate) {
    let limitDate = userData?.body.meeting.limitDate;
    let convertInDate = new Date(Number(limitDate));
    let difference = Math.abs(convertInDate.getTime() - new Date().getTime());
    restDate = new Date(difference);
  }
  let content;
  if (
    userData &&
    userData.body.meeting &&
    userData.body.meeting.status === true
  ) {
    content = (
      <>
        <div style={{ width: "100%" }} className={styles.meet__container__text}>
          <h3 className={styles.meet__container__text__h3}>
            Voici votre prochain rendez-vous :{" "}
          </h3>
          <p className={styles.meet__container__text__p}>
            Votre prochain rendez vous est le{" "}
            {new Date(userData.body.meeting.startAt).toLocaleString("fr-FR", {
              timeZone: "UTC",
            })}
          </p>
          <div className={styles.meet__container__text__div}>
            <button
              className={styles.meet__container__text__div__btn}
              onClick={() => {
                dispatch({
                  type: "form/openModalDeleteMeeting",
                });
              }}
            >
              Supprimer votre rendez-vous
            </button>
          </div>
        </div>
      </>
    );
  } else if (
    userData &&
    userData.body.meeting &&
    userData.body.meeting.status === false
  ) {
    content = (
      <>
        <div className={styles.meet__container__notcomfirm}>
          <div className={styles.meet__container__notcomfirm__text}>
            <h3 className={styles.meet__container__notcomfirm__text__h3}>
              Attention votre rendez-vous n&apos;est pas encore comfirmé
            </h3>
            <p>
              Vous devez terminé le processus de réservation pour que le
              rendez-vous soit actif
            </p>
            <p>
              Il vous reste {Number(restDate?.getUTCMinutes()) + 1} min pour le
              comfirmer
            </p>
            <div className={styles.meet__div}>
              <button
                className={styles.meet__div__div__btn}
                onClick={() => {
                  const fetchAddMeeting = async () => {
                    trigger();
                  };
                  fetchAddMeeting();
                }}
              >
                Comfirmer ce rendez-vous
              </button>
              <button
                className={styles.meet__div__div__btn}
                onClick={() => {
                  dispatch({
                    type: "form/openModalCancelMeeting",
                  });
                }}
              >
                Annuler ce rendez-vous
              </button>
            </div>
          </div>
          <div className={styles.meet__container__notcomfirm__reminder}>
            <h3 className={styles.meet__meet__h3}>Rappel du rendez-vous</h3>
            <p>
              {new Date(userData.body.meeting.startAt).toLocaleString("fr-FR", {
                timeZone: "UTC",
              })}
            </p>
            <p>Consultation vidéo</p>
          </div>
        </div>
      </>
    );
  } else if (userData && !userData.body.meeting && userData.body.discovery) {
    content = (
      <>
        <div className={styles.meet__container__text}>
          <h3 className={styles.meet__container__text__h3}>
            Vous n&apos;avez pas encore de rendez-vous de programmé
          </h3>
          <div className={styles.meet__container__text__h3__div}>
            <div className={styles.meet__container__text__h3__div__div}>
              {userData.body.typeMeeting.type === "unique" && (
                <>
                  <p>
                    Vous disposez actuellement de l&apos;offre{" "}
                    {userData.body.typeMeeting.type}, vous pouvez changer
                    d&apos;offre en cliquant sur le bouton ci-dessous
                  </p>
                  <button
                    className={styles.meet__container__text__h3__div__div__btn}
                    onClick={() => {
                      dispatch({
                        type: "form/openModalEditFormuleUserData",
                      });
                    }}
                  >
                    Changer d&apos;offre
                  </button>
                </>
              )}
              {userData.body.typeMeeting.type !== "unique" && (
                <>
                  <div>
                    <p>
                      Vous disposez actuellement de l&apos;offre{" "}
                      {userData.body.typeMeeting.type}, il vous reste encore{" "}
                      {userData.body.typeMeeting.number} rendez-vous à prendre
                    </p>
                    <p>
                      Vous pouvez annuler votre offre en cliquant sur le bouton
                      ci-dessous
                    </p>
                    <button
                      className={
                        styles.meet__container__text__h3__div__div__btn
                      }
                      onClick={() => {
                        dispatch({
                          type: "form/openModalCancelFormuleUserData",
                        });
                      }}
                    >
                      Annuler d&apos;offre
                    </button>
                  </div>
                </>
              )}
            </div>
            <p className={styles.meet__container__text__h3__div__p}>
              Vous pouvez sélectionner une date en cliquant sur le calendrier.
              La durée standard d&apos;un rendez-vous est de 45 min.
            </p>
            <div className={styles.meet__container__text__h3__div__div}>
              <Image
                className={styles.meet__container__text__h3__div__div__img}
                width="20"
                height="20"
                priority={true}
                src={"/assets/icone/clock-solid.svg"}
                alt="bousole"
              />
              <p className={styles.meet__container__text__h3__div__div__p}>
                : 45 min
              </p>
            </div>
            <div className={styles.meet__container__text__h3__div__div}>
              <Image
                className={styles.meet__container__text__h3__div__div__img}
                width="20"
                height="20"
                priority={true}
                src={"/assets/icone/euro-sign-solid.svg"}
                alt="bousole"
              />
              <p className={styles.meet__container__text__h3__div__div__p}>
                : 100€
              </p>
            </div>
            <p className={styles.meet__container__text__h3__div__p}>
              Vous pouvez m&apos;envoyer un mail en cliquant sur le bouton
              ce-dessous si vous voulez avoir d&apos;avantage de renseignement
              ou pour prendre un rendez-vous personnalisé.
            </p>

            <div className={styles.meet__container__text__h3__div__div}>
              <button
                className={styles.meet__container__text__h3__div__div__btn}
                onClick={() => {
                  push("/contact");
                }}
              >
                Me contacter
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default DisplayMeeting;
